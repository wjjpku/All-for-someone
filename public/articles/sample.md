---
title: 模板示例文章
description: 这是一个示例文章，用于展示网站模板的文章页面效果。
---

# 模板示例文章

欢迎使用「Memory Template」！这是一个配置驱动的个人回忆网站模板。你可以：

- 在 `src/config/` 目录里填充你的文章、相册与聊天数据
- 将素材放到 `public/` 目录，并在配置中引用它们的路径
- 打包后部署到 Vercel 等平台，快速上线

## 如何开始

1. 修改 `src/config/articles.ts`，添加你的文章条目
2. 将 Markdown 文件放到 `public/articles/`，并在条目中设置 `file` 路径
3. 将封面图放到 `public/images/` 或使用 `https://picsum.photos` 这类公共占位图

## Markdown 支持

模板支持标准 Markdown 与表格、列表等扩展（通过 `remark-gfm`）。例如：

| 项目 | 说明 |
|---|---|
| 文章 | 使用 `Markdown` 撰写 |
| 相册 | 通过配置填充，支持懒加载与弹窗查看 |
| 回响 | 仿微信聊天渲染，可自定义头像与背景 |

> 你现在看到的这篇文章，就是一个示例。将它替换为你自己的故事吧！

