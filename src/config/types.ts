// 基础类型定义

export interface ArticleConfig {
    id: string;
    title: string;
    description: string;
    file: string;
    cover?: string;
}

export interface AlbumItem {
    title: string;
    description: string;
    category: string;
    image: string;
}

export interface MusicItem {
    title: string;
    artist: string;
    url: string;
}

export interface ChatMessage {
    id: string;
    sender: 'me' | 'her';
    content: string;
    type: 'text' | 'image' | 'voice';
    date?: string;
    imageUrl?: string;
    voiceDuration?: string;
}

export interface ChatSession {
    id: string;
    title: string;
    date: string;
    background?: string;
    messages: ChatMessage[];
}
