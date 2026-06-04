// NH Logo SVG — Loaded from public directory

import React from 'react';
import Image from 'next/image';

interface NHLogoProps {
  variant?: 'color' | 'white';
  width?: number;
  className?: string;
}

export default function NHLogo({ variant = 'color', width = 175, className }: NHLogoProps) {
  return (
    <div className={className} style={{ width, height: 'auto', display: 'flex', alignItems: 'center' }}>
      <Image
        src={variant === 'white' ? "/NH Logo_white.svg" : "/NH-logo.svg"}
        alt="Narayana Health"
        width={width}
        height={Math.round(width * (42 / 135))}
        priority
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
