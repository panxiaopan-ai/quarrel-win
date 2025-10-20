# 吵架包赢 🔥

一个基于 AI 的智能吵架助手,让你在任何争论中都能占据上风!

## 功能特点

- 🎯 **智能反驳**: 基于 DeepSeek AI 生成 3 条不同角度的犀利回复
- 🎚️ **可调语气**: 1-10 级语气强度,从温和到毁灭性打击
- 🎨 **复古界面**: 致敬经典 macOS 的像素风格设计
- 📱 **响应式**: 完美适配移动端和桌面端
- 💾 **本地存储**: 历史记录保存在 localStorage
- ⚡ **快速响应**: 优化的 API 调用,秒速生成回复

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **AI**: DeepSeek Chat v3 (via OpenRouter)
- **存储**: localStorage

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 配置环境变量

创建 `.env.local` 文件(已包含在项目中):

```env
OPENROUTER_API_KEY=your_api_key_here
```

### 3. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 4. 构建生产版本

```bash
npm run build
npm run start
```

## 使用说明

1. **输入对方的话**: 在文本框中输入你想反驳的内容
2. **调整语气强度**: 拖动滑块选择 1-10 的强度等级
3. **开始吵架**: 点击按钮或按 `Cmd/Ctrl + Enter`
4. **复制回复**: 点击生成的回复卡片即可复制内容

## 语气强度说明

- **1-2**: 温和有礼,保持风度
- **3-4**: 略带讽刺,点到为止
- **5-6**: 直接犀利,有力反击
- **7-8**: 咄咄逼人,毫不留情
- **9-10**: 极其激烈,毁灭性打击

## 项目结构

```
quarrel-win/
├── app/
│   ├── api/argue/route.ts    # AI API 路由
│   ├── layout.tsx             # 根布局
│   ├── page.tsx               # 主页面
│   └── globals.css            # 全局样式
├── components/
│   ├── ArgumentInput.tsx      # 输入组件
│   ├── IntensitySlider.tsx    # 滑块组件
│   ├── ArgumentButton.tsx     # 按钮组件
│   └── ResultDisplay.tsx      # 结果展示组件
├── lib/
│   └── storage.ts             # localStorage 工具
├── types/
│   └── index.ts               # TypeScript 类型
└── public/
    └── fonts/                 # 字体文件
```

## 部署

### Vercel (推荐)

1. 在 [Vercel](https://vercel.com) 创建新项目
2. 导入此 Git 仓库
3. 添加环境变量 `OPENROUTER_API_KEY`
4. 点击部署

### 其他平台

支持任何支持 Next.js 的托管平台,如 Netlify、Railway 等。

## 注意事项

- 本项目仅供娱乐和学习使用
- 请理性沟通,避免真实使用中的过度冲突
- API 调用需要费用,请注意 OpenRouter 的使用额度

## 开源协议

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!

---

**Made with ❤️ by Claude Code**
