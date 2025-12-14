# Memory Template

> 一个配置驱动、可快速部署的个人回忆网站模板
> A config-driven personal memory website template built with React & Vite.

---

## 📖 用户指南：如何定制你的回忆录

这个网站设计为**配置驱动 (Config-Driven)**：你只需修改配置和素材路径，就能发布属于你自己的回忆录网站。本仓库已移除个人隐私数据，内置示例内容（相册/文章/聊天），供你替换。

### 1. 核心配置文件

所有内容管理都在 `src/config/` 目录下（无需改动组件）。

#### 🎨 自定义界面文字与头像 (UI Config)

打开 `src/config/ui.ts`，可修改网站显示文字与部分交互参数。

*   **修改文字**：例如首页卡片标题、按钮文字、错误提示等。
*   **设置头像**：在 `echoes.avatars` 中设置聊天记录里的头像路径。
*   **Catch Me 游戏**：
    *   `skipButton`: 跳过按钮的文字。
    *   `skipDelay`: 多少毫秒后显示跳过按钮 (默认 10000ms)。

#### 🔐 修改密码

打开 `src/config/site.ts`，找到 `AUTH_CONFIG`。

*   **注意**：模板默认无密码（`passwordHashes: []`）。若需开启密码，请存储 **SHA256 哈希值**。
*   **如何操作**：
    1.  访问在线工具（如 [xorbin.com](https://xorbin.com/tools/sha256-hash-calculator)）。
    2.  输入你想设置的密码（例如 `123456`）。
    3.  复制生成的哈希值，替换 `passwordHashes` 数组中的内容。

#### 🖼️ 管理相册

打开 `src/config/album.ts`。模板默认使用 `picsum.photos` 的占位图，你也可以改为自己的图片路径（例：`/images/your-photo.jpg`）。

*   **注意**：
    1.  将照片文件放入 `public/images/` 文件夹。
    2.  确保文件名与配置中的 `image` 路径一致。
*   **如何操作**：
    在 `ALBUM_LIST` 数组中添加新的对象：

    ```typescript
    {
        title: '照片标题',
        description: '详细描述',
        category: '分类标签',
        image: '/images/your-photo.jpg' // 对应 public 目录下的路径
    }
    ```

#### 📝 发布文章

*   **注意**：
    1.  将 Markdown 文章文件 (`.md`) 放入 `public/articles/`。
    2.  确保文件名与配置中的 `file` 路径一致。
    3.  将封面图放入 `public/images/`。
*   **如何操作**：
    在 `ARTICLES_LIST` 中添加新的对象：

    ```typescript
    {
        id: 'unique-id', // 唯一标识符，用于网址路径
        title: '文章标题',
        description: '简短介绍...',
        file: '/articles/your-story.md',
        cover: '/images/your-cover.jpg'
    }
    ```

#### 💬 添加聊天记录 (Echoes)

打开 `src/config/chats.ts`。这是一个记录对话的功能，你可以手动录入或用工具将聊天转换为结构化数据。模板提供了中性示例对话。

```typescript
{
    id: 'chat-id',
    title: '关于初雪',
    date: '2023.11.07',
    background: '/images/snow.jpg', // 可选背景图
    messages: [
        { id: '1', sender: 'her', type: 'text', content: '下雪啦！' }, // 她的消息 (头像在 ui.ts 配置)
        { id: '2', sender: 'me', type: 'text', content: '快出来看！' } // 你的消息 (头像在 ui.ts 配置)
    ]
}
```

#### 🎵 更换背景音乐

打开 `src/config/music.ts`。（如未使用可留空）

*   **注意**：
    1.  将 MP3 文件放入 `public/music/`。
    2.  确保文件名与配置中的 `file` 路径一致。
*   **如何操作**：
    在 `MUSIC_LIST` 中添加新的对象：

    ```typescript
    {
        id: 'unique-id', // 唯一标识符
        title: '音乐标题',
        file: '/music/your-music.mp3' // 对应 public 目录下的路径
    }
    ```

---

## 🛠️ 开发者指南：架构与部署

### 1. 技术栈

*   **核心框架**: React 18 + Vite 5 + TypeScript
*   **样式方案**: Tailwind CSS + @tailwindcss/typography + Google Fonts
*   **路由管理**: React Router v6（页面按需加载 + 空闲预取）
*   **状态管理**: Zustand (配合 persist 中间件实现持久化)
*   **安全加密**: crypto-js (SHA256)
*   **Markdown渲染**: react-markdown + remark-gfm

### 2. 项目架构

```text
src/
├── components/      # UI 组件
│   ├── Auth/        # 密码验证层 (SHA256 加密)
│   ├── Gate/        # 物理引擎小游戏 (Canvas/DOM 混合)
│   ├── Chat/        # 聊天记录渲染器 (仿微信 UI)
│   └── MusicPlayer/ # 全局黑胶播放器 (CSS Animation)
├── config/          # 配置中心 (核心数据与 UI 配置)
│   ├── index.ts     # 统一导出点 (AppConfig 类型定义)
│   ├── ui.ts        # UI 文本与参数配置
│   ├── site.ts      # 站点元数据与认证配置
│   └── ...          # 业务数据 (album, articles, music, chats)
├── pages/           # 页面视图 (Landing, Articles, Album, Echoes)
├── store/           # 全局状态 (useAppStore: 管理解锁状态)
└── ...
```

### 3. 核心原理

*   **层级解锁机制**：
    `App.tsx` 中通过 `useAppStore` 判断当前状态。
    1. 未登录 → 显示 `<Auth />`
    2. 已登录但未过关 → 显示 `<Gate />`
    3. 通过 → 显示主路由内容 (`<Routes />`)

*   **资源加载**：静态资源（图片、音乐、Markdown）放在 `public/`。可使用在线占位图（`https://picsum.photos`）减少仓库体积。
*   **按需加载**：页面组件通过 `React.lazy` 懒加载；在首屏后空闲时间自动预取其它页面，提升后续打开速度。
*   **每日认证**：同设备同浏览器每天至少输入一次密码（若配置了 `AUTH_CONFIG.passwordHashes`）。

### 4. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查 (推荐在提交前运行)
npm run check
```

### 5. 部署（Vercel）

本项目针对 **Vercel** 进行了优化配置。

1. Fork 本仓库到你的 GitHub
2. 登录 [Vercel](https://vercel.com) 并导入项目
3. 自动识别 Vite，点击 **Deploy** 即可
4. 如需开启密码：在 `src/config/site.ts` 写入密码哈希；或运行后在浏览器验证即可
5. 可选：将图片与文章托管为 CDN/远程链接，避免仓库存储私密素材

---
Made with ❤️ for yrc