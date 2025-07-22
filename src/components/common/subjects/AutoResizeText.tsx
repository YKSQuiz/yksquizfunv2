import React, { useRef, useEffect, useState } from 'react';

interface AutoResizeTextProps {
  children: string;
  maxFont?: number;
  minFont?: number;
  style?: React.CSSProperties;
}

const AutoResizeText: React.FC<AutoResizeTextProps> = ({
  children,
  maxFont = 17,
  minFont = 10,
  style
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFont);

  useEffect(() => {
    if (!spanRef.current || !containerRef.current) return;
    
    let currentFont = maxFont;
    spanRef.current.style.fontSize = currentFont + 'px';
    
    let fits = spanRef.current.scrollHeight <= containerRef.current.offsetHeight && 
               spanRef.current.scrollWidth <= containerRef.current.offsetWidth;
    
    while (!fits && currentFont > minFont) {
      currentFont -= 1;
      spanRef.current.style.fontSize = currentFont + 'px';
      fits = spanRef.current.scrollHeight <= containerRef.current.offsetHeight && 
             spanRef.current.scrollWidth <= containerRef.current.offsetWidth;
    }
    
    setFontSize(currentFont);
  }, [children, maxFont, minFont]);

  return (
    <div 
      ref={containerRef} 
      style={{
        width: '100%', 
        height: '2.8em', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        ...style
      }}
    >
      <span 
        ref={spanRef} 
        style={{
          fontSize, 
          fontWeight: 700, 
          lineHeight: 1.22, 
          width: '100%', 
          textAlign: 'center', 
          wordBreak: 'break-word', 
          whiteSpace: 'normal', 
          display: 'block'
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default AutoResizeText; 