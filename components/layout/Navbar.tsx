'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { getUnreadCount } from '@/lib/localStore'

interface NavbarProps {
  user: { id?: string; name?: string | null; profileImage?: string | null }
}

const NAV_LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    href: '/watch',
    label: 'Watch',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9l-6 3.5V8.5L12 12zm6 3.5l-6-3.5 6-3.5v7z" />
      </svg>
    ),
  },
  {
    href: '/friends',
    label: 'Friends',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    href: '/marketplace',
    label: 'Marketplace',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9.5L4.5 4h15l1.5 5.5V11h-1v9H6v-9H5V9.5H3zM14 11H10v5h4v-5zM7 11v7h3v-5h4v5h3v-7H7zM5.5 9.5h13l-1.125-4H6.625L5.5 9.5z" />
      </svg>
    ),
  },
  {
    href: '/groups',
    label: 'Groups',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
]

export default function Navbar({ user }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const { logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user.id) return
    setUnreadMessages(getUnreadCount(user.id))
  }, [user.id])

  const handleLogout = () => {
    setShowMenu(false)
    logout()
    router.push('/login')
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 h-14">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-2 min-w-[240px]">
          <Link href="/" className="flex-shrink-0">
            <div className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold leading-none" style={{ fontFamily: 'serif' }}>f</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center bg-[#f0f2f5] rounded-full px-3 py-2 gap-2 w-52">
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span className="text-gray-500 text-sm">Search Facebook</span>
          </div>
        </div>

        {/* Center: Nav icons */}
        <div className="hidden md:flex items-center h-full">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              title={label}
              className={`relative flex items-center justify-center w-24 h-full border-b-[3px] transition-colors group ${
                isActive(href)
                  ? 'border-[#1877f2] text-[#1877f2]'
                  : 'border-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              {icon}
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right: icons + avatar */}
        <div className="flex items-center gap-1 min-w-[240px] justify-end">
          {/* Grid / Apps */}
          <button className="w-10 h-10 rounded-full bg-[#e4e6eb] hover:bg-gray-300 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM4 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM4 22a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          {/* Messenger */}
          <Link
            href="/messages"
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${pathname.startsWith('/messages') ? 'bg-[#dce8ff] text-[#1877f2]' : 'bg-[#e4e6eb] hover:bg-gray-300 text-gray-800'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.44 5.56 3.7 7.28V22l3.37-1.85c.9.25 1.86.39 2.85.39 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.09 12.45l-2.56-2.73-4.99 2.73 5.49-5.83 2.63 2.73 4.92-2.73-5.49 5.83z" />
            </svg>
            {unreadMessages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </Link>
          {/* Notifications */}
          <Link
            href="/notifications"
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${pathname.startsWith('/notifications') ? 'bg-[#dce8ff] text-[#1877f2]' : 'bg-[#e4e6eb] hover:bg-gray-300 text-gray-800'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </Link>
          {/* Avatar + dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center hover:brightness-95 transition-all"
            >
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name ?? ''} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gray-700">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </button>

            {showMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl py-2 w-64 z-50">
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg mx-2"
                  onClick={() => setShowMenu(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-gray-700">{user.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">See your profile</p>
                  </div>
                </Link>
                <hr className="my-2 mx-3" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mx-auto"
                  style={{ width: 'calc(100% - 16px)', marginLeft: 8 }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#e4e6eb] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                  </div>
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
