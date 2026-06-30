'use client';

import { useState, useCallback, useEffect } from 'react';
import { HistoryRecord } from '@/types/history';

interface UseHistoryState {
  records: HistoryRecord[];
  loading: boolean;
  error: string | null;
}

export function useHistory() {
  const [state, setState] = useState<UseHistoryState>({
    records: [],
    loading: false,
    error: null,
  });

  const fetchHistory = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch('/api/history');

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch history');
      }

      const data = await response.json();
      setState({ records: data.history || [], loading: false, error: null });
    } catch (error) {
      setState({
        records: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load history',
      });
    }
  }, []);

  const updateRecord = useCallback(async (id: string, updates: { notes?: string; isFavorite?: boolean }) => {
    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update record');
      }

      // Refresh the list
      await fetchHistory();
      return true;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update record',
      }));
      return false;
    }
  }, [fetchHistory]);

  const deleteRecord = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete record');
      }

      // Remove from local state immediately for better UX
      setState((prev) => ({
        ...prev,
        records: prev.records.filter((r) => r.id !== id),
      }));
      return true;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete record',
      }));
      return false;
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    ...state,
    fetchHistory,
    updateRecord,
    deleteRecord,
  };
}