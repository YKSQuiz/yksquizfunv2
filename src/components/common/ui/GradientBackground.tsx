import React, { useEffect, useState } from 'react';
import './GradientBackground.css';

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple-blue' | 'blue-purple' | 'green-blue' | 'orange-red' | 'home' | 'subjects' | 'auth' | 'quiz' | 'market' | 'stats' | 'admin' | 'test';
  showParticles?: boolean;
  particleCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  variant = 'default',
  showParticles = true,
  particleCount = 5,
  className = '',
  style = {}
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: number }>>([]);

  useEffect(() => {
    if (showParticles) {
      const newParticles = Array.from({ length: particleCount }, (_, index) => ({
        id: index,
        left: `${(index + 1) * 20}%`,
        delay: index * 2
      }));
      setParticles(newParticles);
    }
  }, [showParticles, particleCount]);

  const containerClasses = [
    'gradient-background',
    `gradient-background-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} style={style}>
      {/* Ana gradient arka plan */}
      <div className="gradient-bg-base"></div>
      
      {/* Particle efektleri */}
      {showParticles && (
        <div className="particle-background">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Geometric şekiller */}
      <div className="geometric-shapes">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
      </div>
      
      {/* İçerik */}
      <div className="gradient-content">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground; 