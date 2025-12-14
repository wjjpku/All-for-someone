import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG, type ChatSession } from '../config';
import { ChatView } from '../components/Chat/ChatView';

export const Echoes: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);

    return (
        <div className="min-h-screen bg-[#fcfbf9] font-sans">
            <header className="py-20 px-4 text-center bg-white border-b border-gray-100">
                <Link to="/" className="text-gray-400 hover:text-gray-900 text-sm tracking-widest uppercase mb-6 inline-block transition-colors">
                    {CONFIG.ui.echoes.backButton}
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-serif">{CONFIG.ui.echoes.title}</h1>
                <p className="mt-4 text-gray-500">{CONFIG.ui.echoes.subtitle}</p>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {CONFIG.chats && CONFIG.chats.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {CONFIG.chats.map((chat) => (
                            <div 
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col justify-between h-48 overflow-hidden"
                            >
                                {/* Background Hint */}
                                {chat.background && (
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                        <img src={chat.background} className="w-full h-full object-cover" alt="" />
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-rose-50 text-rose-500 text-xs font-bold px-2 py-1 rounded-md">
                                            {chat.messages.length} {CONFIG.ui.echoes.msgCountSuffix}
                                        </span>
                                        <span className="text-gray-400 text-xs font-mono">{chat.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                        {chat.title}
                                    </h3>
                                </div>

                                <div className="flex items-center text-gray-400 text-sm group-hover:text-rose-400 transition-colors">
                                    <span>{CONFIG.ui.echoes.clickToRead}</span>
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-20">
                        <p>暂时没有收录的对话...</p>
                    </div>
                )}
            </main>

            {selectedChat && (
                <ChatView session={selectedChat} onClose={() => setSelectedChat(null)} />
            )}
        </div>
    );
};
