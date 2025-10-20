import { NextRequest, NextResponse } from 'next/server';
import { ArgueRequest, ArgueResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { opponentMessage, intensity }: ArgueRequest = await req.json();

    if (!opponentMessage || !opponentMessage.trim()) {
      return NextResponse.json(
        { error: '请输入对方的话' } as ArgueResponse,
        { status: 400 }
      );
    }

    if (intensity < 1 || intensity > 10) {
      return NextResponse.json(
        { error: '语气强度必须在 1-10 之间' } as ArgueResponse,
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 配置错误' } as ArgueResponse,
        { status: 500 }
      );
    }

    // 根据语气强度调整 prompt
    const intensityDescriptions = [
      '', // 0 (不使用)
      '温和但坚定', // 1
      '有礼貌但不失锋芒', // 2
      '略带讽刺', // 3
      '直接且犀利', // 4
      '尖锐有力', // 5
      '强势反击', // 6
      '咄咄逼人', // 7
      '毫不留情', // 8
      '极其激烈', // 9
      '毁灭性打击', // 10
    ];

    const prompt = `你是一个辩论高手,擅长犀利反驳。现在对方说:"${opponentMessage}"

请生成 3 条不同角度的回应,要求:
1. 语气强度为 ${intensity}/10 (${intensityDescriptions[intensity]})
2. 每条回应要简短有力,不超过 50 字
3. 从不同角度反驳,例如:逻辑漏洞、事实错误、价值观问题
4. 回应要机智、犀利,但${intensity <= 5 ? '保持基本礼貌' : '可以很直接'}
5. 直接输出 3 条回应,每条一行,不要编号,不要其他说明

请直接输出 3 条回应:`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', response.status, errorData);
      return NextResponse.json(
        { error: `AI 服务错误 (${response.status}): ${errorData.substring(0, 100)}` } as ArgueResponse,
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: '未能生成回应,请重试' } as ArgueResponse,
        { status: 500 }
      );
    }

    // 解析 3 条回应
    const replies = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .slice(0, 3);

    if (replies.length < 3) {
      // 如果分行不足 3 条,尝试按句号分割
      const sentences = content.split(/[。.！!]/).filter((s: string) => s.trim().length > 0);
      while (replies.length < 3 && sentences.length > 0) {
        replies.push(sentences.shift()!.trim());
      }
    }

    return NextResponse.json({
      replies: replies.slice(0, 3),
    } as ArgueResponse);
  } catch (error) {
    console.error('Error in argue API:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `服务器错误: ${errorMessage}` } as ArgueResponse,
      { status: 500 }
    );
  }
}
