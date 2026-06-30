import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createHistorySchema } from '@/lib/validators';

export async function GET() {
  try {
    const records = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ history: records });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ history: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createHistorySchema.safeParse(body);
    if (!validation.success) {
      console.error('Validation failed:', validation.error.errors);
      return NextResponse.json(
        { error: 'Validation failed', message: validation.error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const record = await prisma.weatherSearch.create({
      data: validation.data,
    });

    console.log('History saved:', record.id);
    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save', message: String(error) },
      { status: 500 }
    );
  }
}