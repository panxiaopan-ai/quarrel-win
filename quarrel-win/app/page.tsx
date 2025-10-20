'use client';

import { useState } from 'react';
import ArgumentInput from '@/components/ArgumentInput';
import IntensitySlider from '@/components/IntensitySlider';
import ArgumentButton from '@/components/ArgumentButton';
import ResultDisplay from '@/components/ResultDisplay';
import { saveToHistory } from '@/lib/storage';
import { ArgueResponse } from '@/types';

export default function Home() {
  const [opponentMessage, setOpponentMessage] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [replies, setReplies] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleArgue = async () => {
    if (!opponentMessage.trim()) {
      setError('请输入对方的话');
      return;
    }

    setLoading(true);
    setError('');
    setReplies([]);

    try {
      const response = await fetch('/api/argue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opponentMessage: opponentMessage.trim(),
          intensity,
        }),
      });

      const data: ArgueResponse = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.replies) {
        setReplies(data.replies);

        // 保存到历史记录
        saveToHistory({
          opponentMessage: opponentMessage.trim(),
          intensity,
          replies: data.replies,
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError('网络错误,请检查连接后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleArgue();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-3 sm:p-6">
      <div className="m-auto flex w-full max-w-xl flex-col window">
        {/* 窗口头部 */}
        <div className="window-header">
          <div className="flex items-center gap-2">
            <div className="window-control"></div>
            <span className="window-title text-sm">吵架王.app</span>
          </div>
          <div className="window-controls">
            <div className="w-3 h-3 border border-black"></div>
          </div>
        </div>

        {/* 窗口内容 */}
        <div className="p-4 sm:p-6 space-y-4" onKeyDown={handleKeyPress}>
          {/* 标题区域 */}
          <header className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-widest mb-1">吵架王</h1>
          </header>

          {/* 主要内容 */}
          <main className="space-y-4">
            <div className="text-center">
              <p className="text-base sm:text-lg">输入对方的话，选择语气，生成你的完美回击！</p>
            </div>

            <div className="space-y-4">
              {/* 输入区域 */}
              <ArgumentInput
                value={opponentMessage}
                onChange={setOpponentMessage}
                disabled={loading}
              />

              {/* 滑块区域 */}
              <IntensitySlider
                value={intensity}
                onChange={setIntensity}
                disabled={loading}
              />

              {/* 按钮区域 */}
              <div className="flex justify-center pt-1">
                <div className="w-full max-w-[280px]">
                  <ArgumentButton
                    onClick={handleArgue}
                    disabled={!opponentMessage.trim() || loading}
                    loading={loading}
                  />
                </div>
              </div>

              {/* 结果显示 */}
              <ResultDisplay replies={replies} error={error} />
            </div>
          </main>

          {/* 页脚 */}
          <footer className="pt-4 text-center text-xs sm:text-sm">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a className="hover:underline cursor-pointer" href="#">关于</a>
              <a className="hover:underline cursor-pointer" href="#">联系</a>
              <a className="hover:underline cursor-pointer" href="#">服务条款</a>
            </div>
            <p className="mt-2">© 1991 吵架王 Inc.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
