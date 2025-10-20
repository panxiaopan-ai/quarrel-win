import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '吵架王 - 生成你的完美回击！',
  description: '基于 AI 的智能吵架助手,让你在任何争论中都能占据上风',
  keywords: '吵架,辩论,AI,反驳,智能助手',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
