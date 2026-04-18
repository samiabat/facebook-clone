'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface NavbarProps {
  user: { id?: string; name?: string | null; email?: string | null; image?: string | null }
}

export default function Navbar({ user }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-14">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
        <Link href="/" className="text-[#1877f2] text-2xl font-bold">
          socialbook
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className="p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1877f2] transition-colors" title="Home">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>
          <Link href="/friends" className="p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#1877f2] transition-colors" title="Friends">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-2 relative">
          <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            {user.image ? (
              <img src={user.image} alt={user.name ?? ''} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-gray-600">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </button>

          {showMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
              <Link
                href={`/profile/${user.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowMenu(false)}
              >
                View Profile
              </Link>
              <hr className="my-1" />
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
