// 站点全局 UI 文本与参数配置
// 这里管理网站中所有静态显示的文字和可调参数

export const UI_CONFIG = {
    // 首页 (Landing Page)
    landing: {
        articlesCard: {
            title: "精选文章",
            subtitle: "Read",
            description: "阅读关于我们的故事与回忆"
        },
        albumCard: {
            title: "时光相册",
            subtitle: "View",
            description: "定格那些珍贵的瞬间"
        },
        echoesCard: {
            title: "回响",
            subtitle: "Listen",
            description: "那些不想遗忘的对话"
        },
        footer: "BY WJJ"
    },

    // 认证页 (Auth)
    auth: {
        title: "Welcome Home",
        placeholder: "Secret Key",
        errorMsg: "(｡•́︿•̀｡) 密码不对哦"
    },

    // 门禁页 (Gate)
    gate: {
        mainText: "Catch Me!",
        subText: "用这块银牌敲敲生气的 YRC ~",
        skipButton: "认输，我抓不到 YRC (｡•́︿•̀｡)",
        skipDelay: 10000, // 多少毫秒后显示跳过按钮
        dogImage: "https://picsum.photos/seed/dog/200/200",
        cursorImage: "https://picsum.photos/seed/cursor/200/200"
    },

    // 文章列表页
    articleList: {
        title: "文章列表",
        backButton: "← Back Home",
        readMore: "Read Story"
    },

    // 相册页
    albumGrid: {
        title: "时光相册",
        backButton: "← Back Home"
    },

    // 回响页 (Echoes)
    echoes: {
        title: "回响",
        subtitle: "那些不想遗忘的对话",
        backButton: "← Back Home",
        clickToRead: "点击阅读",
        msgCountSuffix: " 条消息",
        avatars: {
            me: "https://picsum.photos/seed/me/100/100",
            her: "https://picsum.photos/seed/her/100/100"
        }
    }
};
