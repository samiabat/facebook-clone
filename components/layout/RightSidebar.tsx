'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getUsers } from '@/lib/localStore'
import { SeedUser } from '@/lib/mockData'

export default function RightSidebar() {
  const { user } = useAuth()
  const [suggestions, setSuggestions] = useState<SeedUser[]>([])

  useEffect(() => {
    if (!user) return
    setSuggestions(getUsers().filter((u) => u.id !== user.id).slice(0, 8))
  }, [user])

  if (!user) return null

  return (
    <aside className="hidden xl:block w-72 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
      <h3 className="text-gray-500 font-semibold px-3 mb-3 text-sm">People you may know</h3>
      <div className="space-y-1">
        {suggestions.map((u) => (
          <Link
            key={u.id}
            href={`/profile/${u.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
              {u.profileImage ? (
                <img src={u.profileImage} alt={u.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gray-600">{u.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className="font-medium text-gray-800 text-sm">{u.name}</span>
          </Link>
        ))}
        {suggestions.length === 0 && (
          <p className="px-3 text-sm text-gray-500">No suggestions yet.</p>
        )}
      </div>
    </aside>
  )
}
