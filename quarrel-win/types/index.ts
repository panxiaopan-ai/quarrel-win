export interface ArgueRequest {
  opponentMessage: string;
  intensity: number;
}

export interface ArgueResponse {
  replies: string[];
  error?: string;
}

export interface HistoryItem {
  id: string;
  opponentMessage: string;
  intensity: number;
  replies: string[];
  timestamp: number;
}
