import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth/Auth';
import { Gate } from './components/Gate/Gate';
import { Landing } from './pages/Landing';
import { ArticleList } from './pages/ArticleList';
import { Article } from './pages/Article';
import { AlbumGrid } from './pages/AlbumGrid';
import { Echoes } from './pages/Echoes';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';
import { useAppStore } from './store/useAppStore';

function App() {
  const { isGatePassed } = useAppStore();

  return (
    <div className="min-h-screen font-sans text-gray-900">
      {/* Overlays */}
      <Auth />
      <Gate />
      
      {/* Global Music Player - Visible only after gate passed */}
      <div className={`transition-opacity duration-1000 ${isGatePassed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <MusicPlayer />
      </div>

      {/* Main Content */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          isGatePassed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0 overflow-hidden'
        }`}
      >
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="/album" element={<AlbumGrid />} />
            <Route path="/echoes" element={<Echoes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
