import React, { useState, useEffect, useRef } from 'react';
import SHA256 from 'crypto-js/sha256';
import { useAppStore } from '../../store/useAppStore';
import { CONFIG } from '../../config';
import type { AppConfig } from '../../config';

export const Auth: React.FC = () => {
    const { isAuthenticated, login } = useAppStore();
    const [inputVal, setInputVal] = useState('');
    const [error, setError] = useState(false);
    const [isVisible, setIsVisible] = useState(!isAuthenticated);
    
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const config = CONFIG as AppConfig;
        const hashes = config.auth.passwordHashes || [];
        if (hashes.length === 0 && !isAuthenticated) {
            setIsVisible(false);
            login();
            return;
        }
        if (!isAuthenticated && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAuthenticated]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            verify();
        }
    };

    const verify = () => {
        // Calculate hash of input
        const inputHash = SHA256(inputVal).toString();
        
        // Type assertion to fix editor error
        const config = CONFIG as AppConfig;
        const hashes = config.auth.passwordHashes || [];
        
        if (hashes.includes(inputHash)) {
            setIsVisible(false);
            setTimeout(() => {
                login();
            }, 500);
        } else {
            setError(true);
            setInputVal('');
            setTimeout(() => setError(false), 2000);
        }
    };

    if (isAuthenticated && !isVisible) return null;

    // Type assertion for UI config
    const config = CONFIG as AppConfig;

    return (
        <div 
            className={`fixed inset-0 bg-gradient-to-br from-rose-50 via-white to-blue-50 z-[100] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb a"></div>
                <div className="orb b"></div>
            </div>

            <div className="auth-container">
                <div className="text-4xl mb-4">✨</div>
                <div className="auth-title">{config.ui.auth.title}</div>
                <div className="auth-input-group relative">
                    <input 
                        ref={inputRef}
                        type="password" 
                        className="auth-input pr-12 pl-6 w-[320px]" 
                        placeholder={config.ui.auth.placeholder} 
                        autoComplete="off"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        onClick={verify}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-300 hover:text-rose-500 transition-colors p-2"
                        aria-label="Submit"
                    >
                        ➜
                    </button>
                </div>
                <div className={`auth-error ${error ? 'visible' : ''}`}>
                    <span>{config.ui.auth.errorMsg}</span>
                </div>
                <div className="mt-6 text-rose-300 text-xs tracking-widest opacity-60 font-medium">
                    {config.auth.tips}
                </div>
            </div>
        </div>
    );
};
