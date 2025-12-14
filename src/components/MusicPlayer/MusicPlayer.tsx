import React, { useEffect, useRef, useState } from 'react';
import { CONFIG } from '../../config';

export const MusicPlayer: React.FC = () => {
    // Start playing by default
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const currentTrack = CONFIG.music[currentTrackIndex];

    useEffect(() => {
        // Try to play immediately on mount
        if (audioRef.current) {
            // Set volume to 30%
            audioRef.current.volume = 0.3;
            
            audioRef.current.play().catch(e => {
                console.log("Autoplay prevented:", e);
                setIsPlaying(false); // If prevented, update state
            });
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback prevented:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentTrackIndex, isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        const nextIndex = (currentTrackIndex + 1) % CONFIG.music.length;
        setCurrentTrackIndex(nextIndex);
    };

    const handleNext = () => {
        const nextIndex = (currentTrackIndex + 1) % CONFIG.music.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <audio 
                ref={audioRef}
                src={currentTrack.url}
                onEnded={handleEnded}
            />
            
            <div className={`flex items-center gap-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/50 transition-all duration-500 ${isPlaying ? 'pr-6' : 'pr-3'}`}>
                <div className="relative w-12 h-12 flex items-center justify-center group cursor-pointer" onClick={togglePlay}>
                    {/* Album Art / Disc Animation */}
                    <div className={`absolute inset-0 rounded-full bg-gray-900 border-2 border-gray-200 overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        {/* Vinyl Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-[42%] bg-white rounded-full border border-gray-300 shadow-inner z-10"></div>
                        {/* Grooves */}
                        <div className="absolute inset-[15%] rounded-full border border-gray-800 opacity-50"></div>
                        <div className="absolute inset-[25%] rounded-full border border-gray-800 opacity-50"></div>
                        <div className="absolute inset-[35%] rounded-full border border-gray-800 opacity-50"></div>
                    </div>
                    
                    {/* Play/Pause Icon Overlay - Only visible on hover or when paused */}
                    <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/30 rounded-full' : 'opacity-100'}`}>
                        {isPlaying ? (
                            <svg className="w-5 h-5 fill-white drop-shadow-md" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                            <svg className="w-5 h-5 fill-white drop-shadow-md ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                    </div>
                </div>

                {/* Track Info (Expandable) */}
                <div className={`flex flex-col overflow-hidden transition-all duration-500 ${isPlaying ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                    <span className="text-xs font-bold text-gray-900 truncate">{currentTrack.title}</span>
                    <span className="text-[10px] text-gray-500 truncate">{currentTrack.artist}</span>
                </div>

                {/* Next Button */}
                {isPlaying && (
                    <button 
                        onClick={handleNext}
                        className="text-gray-400 hover:text-gray-800 transition-colors"
                        title="Next Track"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                )}
            </div>
        </div>
    );
};
