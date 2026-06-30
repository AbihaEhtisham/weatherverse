import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateHistorySchema } from '@/lib/validators';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateHistorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', message: validation.error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const existing = await prisma.weatherSearch.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Not found', message: 'Record not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.weatherSearch.update({
      where: { id },
      data: {
        notes: validation.data.notes !== undefined ? validation.data.notes : existing.notes,
        isFavorite: validation.data.isFavorite !== undefined ? validation.data.isFavorite : existing.isFavorite,
      },
    });

    return NextResponse.json({ record: updated });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Database error', message: 'Failed to update record' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.weatherSearch.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Not found', message: 'Record not found' },
        { status: 404 }
      );
    }

    await prisma.weatherSearch.delete({ where: { id } });

    return NextResponse.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Database error', message: 'Failed to delete record' },
      { status: 500 }
    );
  }
}