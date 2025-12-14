import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';

export const ArticleList: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#fcfbf9] font-serif">
            <header className="py-20 px-4 text-center bg-white border-b border-gray-100">
                <Link to="/" className="text-gray-400 hover:text-gray-900 text-sm tracking-widest uppercase mb-6 inline-block transition-colors font-sans">
                    {CONFIG.ui.articleList.backButton}
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{CONFIG.ui.articleList.title}</h1>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid gap-16">
                    {CONFIG.articles.map((article, idx) => (
                        <Link 
                            key={article.id} 
                            to={`/articles/${article.id}`}
                            className="group grid md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Image Section - Alternating order on desktop */}
                            <div className={`aspect-[4/3] rounded-2xl overflow-hidden shadow-md ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                                {article.cover ? (
                                    <img 
                                        src={article.cover} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        No Cover
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className={`space-y-4 ${idx % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                                <span className="text-red-600 text-xs font-bold tracking-widest uppercase font-sans">
                                    Article 0{idx + 1}
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-500 leading-relaxed font-sans text-lg">
                                    {article.description}
                                </p>
                                <div className={`pt-4 ${idx % 2 === 1 ? 'flex justify-end' : ''}`}>
                                    <span className="inline-flex items-center text-gray-900 font-medium border-b-2 border-red-200 group-hover:border-red-600 transition-colors pb-1 font-sans text-sm tracking-wide">
                                        {CONFIG.ui.articleList.readMore} <span className="ml-2">→</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};
