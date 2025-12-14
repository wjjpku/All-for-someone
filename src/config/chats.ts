// 聊天记录
import { ChatSession } from './types';

export const CHATS_LIST: ChatSession[] = [
    {
        id: 'sample1',
        title: '模板示例对话',
        date: '2024.01.01',
        background: 'https://picsum.photos/seed/chatbg/1200/800',
        messages: [
            { id: '1', sender: 'her', type: 'text', content: '你好！欢迎体验这个模板项目。' },
            { id: '2', sender: 'me', type: 'text', content: '你好～我准备把它变成我的个人网站。' },
            { id: '3', sender: 'her', type: 'text', content: '只需要在配置文件里填入你的内容就好了。' },
            { id: '4', sender: 'me', type: 'text', content: '明白了，谢谢！' }
        ]
    },
    {
        id: 'sample2',
        title: '另一个示例会话',
        date: '2024.02.14',
        messages: [
            { id: '1', sender: 'me', type: 'text', content: '这个聊天界面看起来很像微信。' },
            { id: '2', sender: 'her', type: 'text', content: '是的，样式也可以自定义～' }
        ]
    }
];
