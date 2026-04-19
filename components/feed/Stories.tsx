'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUsers } from '@/lib/localStore'
import { SeedUser } from '@/lib/mockData'

const STORY_GRADIENTS = [
  'from-pink-500 to-orange-400',
  'from-blue-500 to-purple-600',
  'from-green-500 to-teal-400',
  'from-yellow-400 to-orange-500',
  'from-purple-500 to-pink-500',
]

export default function Stories() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<SeedUser[]>([])

  useEffect(() => {
    if (!user) return
    setContacts(getUsers().filter((u) => u.id !== user.id).slice(0, 4))
  }, [user])

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
      {/* Create story card */}
      <div className="flex-shrink-0 w-28 h-44 rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white cursor-pointer hover:brightness-95 transition-all relative">
        <div className="h-[70%] bg-gray-200 relative">
          <div className="w-full h-full flex items-center justify-center">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
        <div className="h-[30%] flex flex-col items-center justify-center gap-0.5 bg-white px-1">
          <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center -mt-5 border-2 border-white">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-800 text-center leading-tight mt-1">Create story</span>
        </div>
      </div>

      {/* Friend stories */}
      {contacts.map((contact, i) => (
        <div
          key={contact.id}
          className="flex-shrink-0 w-28 h-44 rounded-xl overflow-hidden shadow-sm cursor-pointer hover:brightness-90 transition-all relative"
        >
          <div className={`w-full h-full bg-gradient-to-b ${STORY_GRADIENTS[i % STORY_GRADIENTS.length]} flex items-end p-2`}>
            {/* Avatar */}
            <div className="absolute top-2 left-2 w-9 h-9 rounded-full border-[3px] border-[#1877f2] overflow-hidden bg-gray-300 flex items-center justify-center">
              {contact.profileImage ? (
                <img src={contact.profileImage} alt={contact.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-white">{contact.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {/* Name */}
            <p className="text-white text-xs font-semibold leading-tight drop-shadow">{contact.name.split(' ')[0]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
