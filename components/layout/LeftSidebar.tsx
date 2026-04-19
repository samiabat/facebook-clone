'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LeftSidebarProps {
  user: { id?: string; name?: string | null; profileImage?: string | null }
}

const NAV_ITEMS = [
  {
    href: '/friends',
    label: 'Friends',
    bgColor: 'bg-[#dce8ff]',
    iconColor: 'text-[#1877f2]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    href: '/memories',
    label: 'Memories',
    bgColor: 'bg-[#fce8ff]',
    iconColor: 'text-[#aa00ff]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
      </svg>
    ),
  },
  {
    href: '/saved',
    label: 'Saved',
    bgColor: 'bg-[#ede7f6]',
    iconColor: 'text-[#7c4dff]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    href: '/groups',
    label: 'Groups',
    bgColor: 'bg-[#e8f5e9]',
    iconColor: 'text-[#2e7d32]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    href: '/reels',
    label: 'Reels',
    bgColor: 'bg-[#fce4ec]',
    iconColor: 'text-[#c62828]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z" />
      </svg>
    ),
  },
  {
    href: '/marketplace',
    label: 'Marketplace',
    bgColor: 'bg-[#fff8e1]',
    iconColor: 'text-[#f57f17]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9.5L4.5 4h15l1.5 5.5V11h-1v9H6v-9H5V9.5H3zM14 11H10v5h4v-5z" />
      </svg>
    ),
  },
  {
    href: '/',
    label: 'Feeds',
    bgColor: 'bg-[#e3f2fd]',
    iconColor: 'text-[#1565c0]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 5h2v2H3zm0 4h2v2H3zm0 4h2v2H3zm4-8h14v2H7zm0 4h14v2H7zm0 4h14v2H7z" />
      </svg>
    ),
  },
  {
    href: '/events',
    label: 'Events',
    bgColor: 'bg-[#ffebee]',
    iconColor: 'text-[#b71c1c]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </svg>
    ),
  },
  {
    href: '/watch',
    label: 'Watch',
    bgColor: 'bg-[#e8eaf6]',
    iconColor: 'text-[#3949ab]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9l-6 3.5V8.5L12 12zm6 3.5l-6-3.5 6-3.5v7z" />
      </svg>
    ),
  },
  {
    href: '/jobs',
    label: 'Jobs',
    bgColor: 'bg-[#e0f2f1]',
    iconColor: 'text-[#00695c]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 3 16.5 1.5 14.5 1.5h-5C7.5 1.5 6 3 6 4.64c0 .48.11.92.18 1.36H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5.5-3c1.03 0 1.5.5 1.5 1.5S15.53 6 14.5 6h-5C8.47 6 8 5.5 8 4.5S8.47 3 9.5 3h5zM20 19H4V8h16v11z" />
      </svg>
    ),
  },
]

const VISIBLE_COUNT = 7

export default function LeftSidebar({ user }: LeftSidebarProps) {
  const pathname = usePathname()
  const [showMore, setShowMore] = useState(false)

  const visibleItems = showMore ? NAV_ITEMS : NAV_ITEMS.slice(0, VISIBLE_COUNT)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <aside className="hidden lg:block w-72 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-2 scrollbar-thin">
      <div className="space-y-0.5">
        {/* Profile link */}
        <Link
          href={`/profile/${user.id}`}
          className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${
            pathname.startsWith('/profile') ? 'bg-[#dce8ff]' : 'hover:bg-gray-200'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name ?? ''} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-gray-700">{user.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <span className="font-semibold text-gray-900 text-sm">{user.name}</span>
        </Link>

        {/* Nav items */}
        {visibleItems.map(({ href, label, icon, bgColor, iconColor }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${
              isActive(href) ? 'bg-[#dce8ff]' : 'hover:bg-gray-200'
            }`}
          >
            <div className={`w-9 h-9 rounded-full ${bgColor} ${iconColor} flex items-center justify-center flex-shrink-0`}>
              {icon}
            </div>
            <span className="font-semibold text-gray-900 text-sm">{label}</span>
          </Link>
        ))}

        {/* See more / less toggle */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors w-full"
        >
          <div className="w-9 h-9 rounded-full bg-[#e4e6eb] flex items-center justify-center flex-shrink-0">
            <svg
              className={`w-5 h-5 text-gray-800 transition-transform ${showMore ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm">{showMore ? 'See less' : 'See more'}</span>
        </button>
      </div>

      <hr className="my-3 mx-2 border-gray-300" />

      <div className="px-3 pb-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          Privacy · Terms · Advertising · Ad Choices ▶ · Cookies · More
        </p>
        <p className="text-xs text-gray-400 mt-1">Meta © 2024</p>
      </div>
    </aside>
  )
}
