'use client'

import { useId } from 'react'

interface SocialBladeLogoProps {
  size?: number
  className?: string
}

export default function SocialBladeLogo({ size = 40, className = '' }: SocialBladeLogoProps) {
  const gradId = useId()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Social Blade logo"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1877f2" />
          <stop offset="1" stopColor="#7c4dff" />
        </linearGradient>
      </defs>
      {/* Background rounded square */}
      <rect width="40" height="40" rx="10" fill={`url(#${gradId})`} />
      {/* Sword / blade shape: pointed blade + crossguard + handle */}
      <path
        d="M20 5 L22 18 L27 18 L27 21 L22 21 L21.5 33 L20 34.5 L18.5 33 L18 21 L13 21 L13 18 L18 18 Z"
        fill="white"
      />
      {/* Pommel */}
      <ellipse cx="20" cy="35.5" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.75)" />
      {/* Blade shine */}
      <line x1="20" y1="6" x2="20" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
