import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CONFIG } from '../../config';

export const Gate: React.FC = () => {
    const { isGatePassed, passGate } = useAppStore();
    const [isVisible, setIsVisible] = useState(!isGatePassed);
    const [showSkip, setShowSkip] = useState(false);
    
    // Animation refs
    const requestRef = useRef<number>();
    const dogRef = useRef<HTMLImageElement>(null);
    const hitRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLImageElement>(null);
    
    // Physics state
    const state = useRef({
        x: 0, y: 0,
        vx: 0, vy: 0,
        rot: 0,
        lastTime: 0,
        running: true,
        vw: window.innerWidth,
        vh: window.innerHeight,
        dogW: 120,
        dogH: 120
    });

    useEffect(() => {
        if (isGatePassed) {
            setIsVisible(false);
            return;
        }

        // Show skip button after configured delay
        const timer = setTimeout(() => {
            setShowSkip(true);
        }, CONFIG.ui.gate.skipDelay);

        const initAnimation = () => {
            const s = state.current;
            s.vw = window.innerWidth;
            s.vh = window.innerHeight;
            
            // Random start position
            const paddingX = s.vw * 0.2;
            const paddingY = s.vh * 0.2;
            s.x = paddingX + Math.random() * (s.vw - paddingX * 2 - s.dogW);
            s.y = paddingY + Math.random() * (s.vh - paddingY * 2 - s.dogH);

            const speed = 600;
            const angle = Math.random() * Math.PI * 2;
            s.vx = Math.cos(angle) * speed;
            s.vy = Math.sin(angle) * speed;
            s.lastTime = performance.now();
            s.running = true;

            requestRef.current = requestAnimationFrame(animate);
        };

        const animate = (time: number) => {
            if (!state.current.running) return;
            
            const s = state.current;
            const dt = Math.min((time - s.lastTime) / 1000, 0.032);
            s.lastTime = time;

            // Physics update logic
            let nx = s.x + s.vx * dt;
            let ny = s.y + s.vy * dt;
            let bx = false, by = false;

            // Boundaries
            if (nx < 0) { nx = 0; s.vx = Math.abs(s.vx); bx = true; }
            else if (nx + s.dogW > s.vw) { nx = s.vw - s.dogW; s.vx = -Math.abs(s.vx); bx = true; }

            if (ny < 0) { ny = 0; s.vy = Math.abs(s.vy); by = true; }
            else if (ny + s.dogH > s.vh) { ny = s.vh - s.dogH; s.vy = -Math.abs(s.vy); by = true; }

            // Bounce perturbation
            if (bx || by) {
                const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
                const minSpeed = 400;
                if (speed < minSpeed) {
                    const scale = minSpeed / speed;
                    s.vx *= scale;
                    s.vy *= scale;
                }
                
                // Perturb
                let angle = Math.atan2(s.vy, s.vx);
                angle += (Math.random() - 0.5) * 0.5;
                const nSpeed = Math.hypot(s.vx, s.vy);
                s.vx = Math.cos(angle) * nSpeed;
                s.vy = Math.sin(angle) * nSpeed;
            }

            // Update State
            s.x = nx;
            s.y = ny;
            s.rot += dt * 2.0;

            // Render
            if (dogRef.current) {
                dogRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rot}rad)`;
            }
            if (hitRef.current) {
                hitRef.current.style.transform = `translate(${s.x}px, ${s.y}px)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            state.current.vw = window.innerWidth;
            state.current.vh = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            
            // Mouse avoidance logic could go here
            const s = state.current;
            const cx = s.x + s.dogW / 2;
            const cy = s.y + s.dogH / 2;
            const dist = Math.hypot(cx - e.clientX, cy - e.clientY);
            
            if (dist < 220) {
                const ang = Math.atan2(cy - e.clientY, cx - e.clientX);
                s.vx += Math.cos(ang) * 20;
                s.vy += Math.sin(ang) * 20;
                
                const max = 900;
                const speed = Math.hypot(s.vx, s.vy);
                if (speed > max) {
                    s.vx = (s.vx / speed) * max;
                    s.vy = (s.vy / speed) * max;
                }
            }
        };

        initAnimation();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearTimeout(timer);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isGatePassed]);

    const handleDogClick = () => {
        state.current.running = false;
        setIsVisible(false);
        setTimeout(() => {
            passGate();
        }, 500);
    };

    const handleSkip = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering hitbox if overlapping (though unlikely due to z-index)
        handleDogClick();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-yellow-50/90 z-[90] overflow-hidden cursor-none backdrop-blur-sm">
            <div className="orb a"></div>
            <div className="orb b"></div>
            <div className="orb c"></div>
            <div id="gate-text">{CONFIG.ui.gate.mainText}</div>
            <div id="gate-tip">{CONFIG.ui.gate.subText}</div>

            <img 
                ref={dogRef}
                id="tricky-dog" 
                src={config.ui.gate.dogImage} 
                alt="dog"
                className="absolute w-[120px] h-[120px] object-cover rounded-full border-[6px] border-white shadow-2xl select-none pointer-events-none will-change-transform"
                onLoad={() => {
                    if (dogRef.current) {
                        state.current.dogW = dogRef.current.offsetWidth || 120;
                        state.current.dogH = dogRef.current.offsetHeight || 120;
                    }
                }}
            />
            
            {/* Hitbox */}
            <div 
                ref={hitRef}
                className="absolute w-[120px] h-[120px] cursor-none z-10 rounded-full"
                onClick={handleDogClick}
            ></div>

            {/* Skip Button */}
            {showSkip && (
                <div className="absolute bottom-24 w-full flex justify-center z-20 pointer-events-auto">
                    <button
                        onClick={handleSkip}
                        className="px-6 py-2 bg-white/80 hover:bg-white text-gray-500 hover:text-rose-500 rounded-full text-sm font-bold tracking-widest shadow-lg transition-all duration-300 animate-fade-in-up border border-gray-200 cursor-none"
                    >
                        {CONFIG.ui.gate.skipButton}
                    </button>
                </div>
            )}

            {/* Custom Cursor */}
            <img 
                ref={cursorRef}
                src={config.ui.gate.cursorImage} 
                className="fixed w-20 h-20 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow-lg bg-yellow-100 object-cover p-2"
                style={{ display: 'none' }} 
                onLoad={(e) => (e.currentTarget.style.display = 'block')}
            />
        </div>
    );
};
