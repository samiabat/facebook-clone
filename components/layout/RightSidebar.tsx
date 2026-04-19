'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getUsers } from '@/lib/localStore'
import { SeedUser } from '@/lib/mockData'

const SPONSORED_ADS = [
  {
    id: 1,
    image: 'https://placehold.co/60x60/4CAF50/white?text=Ad',
    title: 'Boost Your Business',
    url: 'growwithads.com',
    description: 'Reach more customers with targeted ads.',
  },
  {
    id: 2,
    image: 'https://placehold.co/60x60/2196F3/white?text=Ad',
    title: 'Learn to Code Online',
    url: 'devacademy.io',
    description: 'Start your tech career today.',
  },
]

export default function RightSidebar() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<SeedUser[]>([])

  useEffect(() => {
    if (!user) return
    setContacts(getUsers().filter((u) => u.id !== user.id).slice(0, 8))
  }, [user])

  if (!user) return null

  return (
    <aside className="hidden xl:block w-72 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4 space-y-4">
      {/* Sponsored */}
      <div>
        <h3 className="text-gray-500 font-semibold px-3 mb-3 text-base">Sponsored</h3>
        <div className="space-y-3 px-1">
          {SPONSORED_ADS.map((ad) => (
            <div key={ad.id} className="flex gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-[120px] h-[120px] rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm leading-tight">{ad.description}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
                  {ad.url}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="mx-3 border-gray-300" />

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between px-3 mb-2">
          <h3 className="text-gray-500 font-semibold text-base">Contacts</h3>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-0.5">
          {contacts.map((contact, idx) => (
            <Link
              key={contact.id}
              href={`/profile/${contact.id}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                  {contact.profileImage ? (
                    <img src={contact.profileImage} alt={contact.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-gray-700">{contact.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {/* Online indicator — alternate online/offline for demo */}
                {idx % 3 !== 2 && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <span className="font-medium text-gray-900 text-sm">{contact.name}</span>
            </Link>
          ))}
          {contacts.length === 0 && (
            <p className="px-3 text-sm text-gray-500">No contacts yet.</p>
          )}
        </div>
      </div>
    </aside>
  )
}
