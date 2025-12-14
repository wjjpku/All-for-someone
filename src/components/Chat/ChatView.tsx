import React, { useEffect, useState, useRef } from 'react';
import { CONFIG, ChatSession } from '../../config';
import type { AppConfig } from '../../config';

export const ChatView: React.FC<{ session: ChatSession; onClose: () => void }> = ({ session, onClose }) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const config = CONFIG as AppConfig;
    
    // Auto-reveal messages
    useEffect(() => {
        if (visibleCount < session.messages.length) {
            const timer = setTimeout(() => {
                setVisibleCount(prev => prev + 1);
            }, 1200); // Delay between messages
            return () => clearTimeout(timer);
        }
    }, [visibleCount, session.messages.length]);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        }
    }, [visibleCount]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md h-[80vh] bg-[#f2f2f2] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                
                {/* Header */}
                <div className="bg-[#ededed] border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">{session.title}</h3>
                            <p className="text-[10px] text-gray-500">{session.date}</p>
                        </div>
                    </div>
                    <button className="text-gray-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </button>
                </div>

                {/* Background Image (Optional) */}
                {session.background && (
                    <div className="absolute inset-0 z-0 opacity-10">
                        <img src={session.background} className="w-full h-full object-cover" alt="" />
                    </div>
                )}

                {/* Messages Area */}
                <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 z-10">
                    {session.messages.slice(0, visibleCount).map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                        >
                            {/* Avatar (Her) */}
                            {msg.sender === 'her' && (
                                <div className="w-9 h-9 rounded-md bg-white mr-2 overflow-hidden shadow-sm flex-shrink-0">
                                    <img src={config.ui.echoes.avatars.her} className="w-full h-full object-cover" alt="Her" />
                                </div>
                            )}

                            {/* Bubble */}
                            <div 
                                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm shadow-sm leading-relaxed relative
                                    ${msg.sender === 'me' 
                                        ? 'bg-[#95ec69] text-black' // WeChat Green for Me
                                        : 'bg-white text-black'      // White for Her
                                    }
                                    ${msg.type === 'image' ? 'p-1 bg-transparent shadow-none' : ''}
                                `}
                            >
                                {/* Arrow */}
                                {msg.type !== 'image' && (
                                    <div className={`absolute top-3 w-2 h-2 transform rotate-45 
                                        ${msg.sender === 'me' ? '-right-1 bg-[#95ec69]' : '-left-1 bg-white'}
                                    `}></div>
                                )}

                                {msg.type === 'text' && <p className="relative z-10 whitespace-pre-wrap">{msg.content}</p>}
                                
                                {msg.type === 'image' && msg.imageUrl && (
                                    <img src={msg.imageUrl} className="rounded-lg max-w-full" alt="Chat Image" />
                                )}

                                {msg.type === 'voice' && (
                                    <div className="flex items-center gap-2 min-w-[60px]">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                        <span>{msg.voiceDuration || "10''"}</span>
                                    </div>
                                )}
                            </div>

                            {/* Avatar (Me) */}
                            {msg.sender === 'me' && (
                                <div className="w-9 h-9 rounded-md bg-gray-300 ml-2 overflow-hidden shadow-sm flex-shrink-0">
                                    <img src={config.ui.echoes.avatars.me} className="w-full h-full object-cover bg-yellow-100" alt="Me" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Input Bar (Visual Only) */}
                <div className="bg-[#f7f7f7] border-t border-gray-200 px-3 py-2 flex items-center gap-3 z-10">
                    <div className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <div className="flex-1 h-9 bg-white rounded-md border border-gray-200"></div>
                    <div className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center">
                        <span className="text-xl text-gray-500 mb-1">+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
