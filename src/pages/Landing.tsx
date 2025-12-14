import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';

export const Landing: React.FC = () => {
    const { ui, site, articles, album } = CONFIG;
    
    return (
        <div className="min-h-screen bg-[#fcfbf9] flex flex-col items-center justify-center p-4">
            <header className="text-center mb-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight font-serif mb-6">
                    {site.title}
                </h1>
                <p className="text-xl text-gray-500 font-light tracking-wide font-sans">
                    {site.description}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                {/* Articles Card */}
                <Link 
                    to="/articles" 
                    className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                    <div className="absolute inset-0 bg-gray-200">
                        <img 
                            src={site.covers.articles || 'https://picsum.photos/seed/articles-fallback/1200/600'} 
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            alt="Articles"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                        <span className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">
                            {ui.landing.articlesCard.subtitle}
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {ui.landing.articlesCard.title}
                        </h2>
                        <p className="text-white/80 line-clamp-2 text-sm">
                            {ui.landing.articlesCard.description}
                        </p>
                    </div>
                </Link>

                {/* Album Card */}
                <Link 
                    to="/album" 
                    className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                    <div className="absolute inset-0 bg-gray-200">
                        <img 
                            src={site.covers.album || 'https://picsum.photos/seed/album-fallback/1200/600'} 
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            alt="Album"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                        <span className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">
                            {ui.landing.albumCard.subtitle}
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {ui.landing.albumCard.title}
                        </h2>
                        <p className="text-white/80 line-clamp-2 text-sm">
                            {ui.landing.albumCard.description}
                        </p>
                    </div>
                </Link>

                {/* Echoes Card */}
                <Link 
                    to="/echoes" 
                    className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                    <div className="absolute inset-0 bg-rose-50">
                        <img 
                            src={site.covers.echoes || 'https://picsum.photos/seed/echoes-fallback/1200/600'} 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 blur-sm scale-110"
                            alt="Echoes"
                            onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/echoes-error/1200/600'} 
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                        <span className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">
                            {ui.landing.echoesCard.subtitle}
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {ui.landing.echoesCard.title}
                        </h2>
                        <p className="text-white/80 line-clamp-2 text-sm">
                            {ui.landing.echoesCard.description}
                        </p>
                    </div>
                </Link>
            </div>
            
            <footer className="mt-24 text-gray-400 text-sm font-sans tracking-widest uppercase opacity-60">
                {ui.landing.footer}
            </footer>
        </div>
    );
};
