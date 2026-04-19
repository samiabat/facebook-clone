'use client'

import { useState } from 'react'
import Link from 'next/link'

const SUGGESTED_GROUPS = [
  { id: 1, name: 'Web Developers Community', members: '128K members', category: 'Technology', image: 'https://picsum.photos/seed/web_dev_group/400/200' },
  { id: 2, name: 'Photography Enthusiasts', members: '87K members', category: 'Hobbies', image: 'https://picsum.photos/seed/photography_group/400/200' },
  { id: 3, name: 'Healthy Living & Wellness', members: '245K members', category: 'Health', image: 'https://picsum.photos/seed/wellness_group/400/200' },
  { id: 4, name: 'Travel & Adventure Club', members: '312K members', category: 'Travel', image: 'https://picsum.photos/seed/travel_group/400/200' },
  { id: 5, name: 'Cooking & Recipes', members: '189K members', category: 'Food', image: 'https://picsum.photos/seed/cooking_group/400/200' },
  { id: 6, name: 'Music Lovers', members: '421K members', category: 'Entertainment', image: 'https://picsum.photos/seed/music_group/400/200' },
]

const YOUR_GROUPS = [
  { id: 7, name: 'React & Next.js Devs', members: '45K members', image: 'https://picsum.photos/seed/react_group/400/200' },
  { id: 8, name: 'Local Fitness Meetup', members: '2.3K members', image: 'https://picsum.photos/seed/fitness_group/400/200' },
]

export default function GroupsPage() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([])

  const toggleJoin = (id: number) => {
    setJoinedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Your groups */}
      {YOUR_GROUPS.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your groups</h2>
            <button className="text-[#1877f2] text-sm font-semibold hover:underline">See all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {YOUR_GROUPS.map((group) => (
              <div key={group.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-24 overflow-hidden">
                  <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 text-sm">{group.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{group.members}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Create a group */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#e7f3ff] flex items-center justify-center flex-shrink-0">
          <svg className="w-7 h-7 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">Create new group</p>
          <p className="text-gray-500 text-sm">Connect people around a common interest</p>
        </div>
        <button className="px-4 py-2 bg-[#e7f3ff] text-[#1877f2] rounded-lg font-semibold text-sm hover:bg-[#dce8ff] transition-colors">
          Create
        </button>
      </div>

      {/* Suggested groups */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Suggested for you</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUGGESTED_GROUPS.map((group) => {
            const joined = joinedGroups.includes(group.id)
            return (
              <div key={group.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-24 overflow-hidden">
                  <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 text-sm">{group.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{group.members} · {group.category}</p>
                  <button
                    onClick={() => toggleJoin(group.id)}
                    className={`mt-3 w-full py-1.5 rounded-lg font-semibold text-sm transition-colors ${
                      joined
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-[#e7f3ff] text-[#1877f2] hover:bg-[#dce8ff]'
                    }`}
                  >
                    {joined ? '✓ Joined' : '+ Join group'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
