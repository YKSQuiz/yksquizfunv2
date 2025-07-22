import React, { useEffect, useRef, useState } from 'react';

interface AutoResizeTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  minFontSize?: number;
  maxFontSize?: number;
}

const AutoResizeText: React.FC<AutoResizeTextProps> = ({
  text,
  className = '',
  style = {},
  minFontSize = 12,
  maxFontSize = 24
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!textRef.current) return;

      const container = textRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      let currentFontSize = maxFontSize;
      container.style.fontSize = `${currentFontSize}px`;

      while (
        (container.scrollWidth > containerWidth || 
         container.scrollHeight > containerHeight) && 
        currentFontSize > minFontSize
      ) {
        currentFontSize--;
        container.style.fontSize = `${currentFontSize}px`;
      }

      setFontSize(currentFontSize);
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, [text, minFontSize, maxFontSize]);

  return (
    <div
      ref={textRef}
      className={`auto-resize-text ${className}`}
      style={{
        fontSize: `${fontSize}px`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...style
      }}
    >
      {text}
    </div>
  );
};

export default AutoResizeText; 