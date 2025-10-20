'use client';

import { useState } from 'react';

interface ResultDisplayProps {
  replies: string[];
  error?: string;
}

export default function ResultDisplay({ replies, error }: ResultDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (reply: string, index: number) => {
    navigator.clipboard.writeText(reply);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (error) {
    return (
      <div className="w-full mt-4">
        <div className="result-card bg-red-100 border-red-500">
          <p className="text-sm sm:text-base">❌ {error}</p>
        </div>
      </div>
    );
  }

  if (replies.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-4 space-y-3">
      <h3 className="text-base sm:text-lg font-bold mb-2">💬 你的反击方案:</h3>

      {replies.map((reply, index) => (
        <div
          key={index}
          className="result-card"
          onClick={() => handleCopy(reply, index)}
        >
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 bg-black text-white
                           flex items-center justify-center
                           text-xs font-bold">
              {index + 1}
            </span>
            <p className="flex-1 leading-relaxed">
              {reply}
            </p>
            {copiedIndex === index && (
              <span className="text-xs font-bold whitespace-nowrap">✓ 已复制</span>
            )}
          </div>
        </div>
      ))}

      <p className="text-xs text-center mt-3 opacity-60">
        💡 点击卡片可复制内容
      </p>
    </div>
  );
}
