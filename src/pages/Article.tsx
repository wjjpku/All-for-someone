import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams, Link } from 'react-router-dom';
import { CONFIG } from '../config';

export const Article: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const articleConfig = CONFIG.articles.find(a => a.id === id);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (articleConfig?.file) {
            setLoading(true);
            fetch(articleConfig.file)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to load');
                    return res.text();
                })
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setContent('加载文章失败，请检查文件路径或网络连接。');
                    setLoading(false);
                });
        }
    }, [articleConfig]);

    if (!articleConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">文章未找到</h2>
                    <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">返回首页</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-16 px-4 sm:px-6 lg:px-8 font-serif">
            <article className="max-w-3xl mx-auto">
                <Link 
                    to="/" 
                    className="group inline-flex items-center text-gray-500 hover:text-gray-900 mb-12 transition-colors duration-300 no-underline font-sans text-sm tracking-wide"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300 mr-2">←</span> 
                    返回首页
                </Link>
                
                {articleConfig.cover && (
                    <div className="relative aspect-[21/9] w-full mb-12 overflow-hidden rounded-sm shadow-sm">
                        <img 
                            src={articleConfig.cover} 
                            alt={articleConfig.title} 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}

                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                        {articleConfig.title}
                    </h1>
                    <div className="w-12 h-1 bg-red-800 mx-auto opacity-80"></div>
                </header>
                
                {loading ? (
                    <div className="animate-pulse space-y-6 max-w-2xl mx-auto">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-20 bg-transparent"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                ) : (
                    <div className="prose prose-lg prose-stone mx-auto prose-p:indent-8 prose-p:text-justify prose-headings:font-bold prose-a:text-red-700 hover:prose-a:text-red-600 prose-img:rounded-sm prose-img:shadow-md">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({node, ...props}) => {
                                    // Custom renderer to preserve line breaks if needed, 
                                    // but default markdown behavior usually fits well with prose.
                                    // We add a specific class for better typography.
                                    return <p className="leading-8 text-gray-800 tracking-wide" {...props} />
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}

                <div className="mt-24 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-400 text-sm font-sans italic">
                        — {CONFIG.site.title} —
                    </p>
                </div>
            </article>
        </div>
    );
};
