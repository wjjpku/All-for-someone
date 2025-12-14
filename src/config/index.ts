// 统一导出所有配置
import { SITE_CONFIG, AUTH_CONFIG } from './site';
import { MUSIC_LIST } from './music';
import { ALBUM_LIST } from './album';
import { ARTICLES_LIST } from './articles';
import { CHATS_LIST } from './chats';
import { UI_CONFIG } from './ui';
import { ArticleConfig, AlbumItem, MusicItem, ChatMessage, ChatSession } from './types';

// 导出类型，方便其他文件引用
export type { ArticleConfig, AlbumItem, MusicItem, ChatMessage, ChatSession };

// 定义总配置的类型
// 使用 ReturnType 获取实际对象的类型结构
export interface AppConfig {
    site: typeof SITE_CONFIG;
    auth: typeof AUTH_CONFIG;
    music: MusicItem[];
    album: AlbumItem[];
    articles: ArticleConfig[];
    chats: ChatSession[];
    ui: typeof UI_CONFIG;
}

// 导出统一的 CONFIG 对象
export const CONFIG: AppConfig = {
    site: SITE_CONFIG,
    auth: AUTH_CONFIG,
    music: MUSIC_LIST,
    album: ALBUM_LIST,
    articles: ARTICLES_LIST,
    chats: CHATS_LIST,
    ui: UI_CONFIG
};
