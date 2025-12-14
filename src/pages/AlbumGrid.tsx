import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG, AlbumItem } from '../config';

export const AlbumGrid: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<AlbumItem | null>(null);

    return (
        <div className="min-h-screen bg-[#fcfbf9] font-sans">
            <header className="py-20 px-4 text-center bg-white border-b border-gray-100">
                <Link to="/" className="text-gray-400 hover:text-gray-900 text-sm tracking-widest uppercase mb-6 inline-block transition-colors">
                    {CONFIG.ui.albumGrid.backButton}
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight font-serif">{CONFIG.ui.albumGrid.title}</h1>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {CONFIG.album.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {item.description || item.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Image Modal */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 bg-white/95 z-50 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
                    onClick={() => setSelectedItem(null)}
                >
                    <div 
                        className="max-w-6xl w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Image Side */}
                        <div className="flex-1 w-full h-full flex items-center justify-center p-4">
                            <img 
                                src={selectedItem.image} 
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg" 
                                alt={selectedItem.title}
                            />
                        </div>

                        {/* Info Side */}
                        <div className="w-full md:w-96 flex-shrink-0 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 md:h-auto overflow-y-auto">
                            <div className="mb-6">
                                <span className="text-red-500 text-xs font-bold tracking-widest uppercase bg-red-50 px-3 py-1 rounded-full">
                                    {selectedItem.category}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">{selectedItem.title}</h2>
                            <div className="w-12 h-1 bg-gray-200 mb-6"></div>
                            <p className="text-gray-600 leading-relaxed">
                                {selectedItem.description}
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-md"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
