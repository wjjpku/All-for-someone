// 站点与认证配置
// 注意：为了安全性，这里的密码存储的是 SHA256 哈希值
// 您可以使用在线工具（如 https://xorbin.com/tools/sha256-hash-calculator）生成哈希值

export const SITE_CONFIG = {
    title: "Memory Template",
    description: "A config-driven personal memory website template",
    
    // 首页板块封面
    covers: {
        articles: 'https://picsum.photos/seed/articles/1200/600',
        album: 'https://picsum.photos/seed/album/1200/600',
        echoes: 'https://picsum.photos/seed/echoes/1200/600'
    },
    
    // 聊天头像
    avatars: {
        her: 'https://picsum.photos/seed/her-avatar/100/100',
        me: 'https://picsum.photos/seed/me-avatar/100/100'
    }
};

export const AUTH_CONFIG = {
    // 存储的是密码的 SHA256 哈希值，不再是明文
    // "123456"  -> "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
    passwordHashes: [],
    tips: "默认无密码。请参考 README 设置密码哈希。"
};
