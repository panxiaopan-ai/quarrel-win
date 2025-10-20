import { HistoryItem } from '@/types';

const STORAGE_KEY = 'quarrel-win-history';
const MAX_HISTORY = 50;

export const saveToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>): void => {
  if (typeof window === 'undefined') return;

  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

export const getHistory = (): HistoryItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};
