'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getConversations, Conversation } from '@/lib/localStore'
import { formatDate } from '@/lib/utils'

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    if (!user) return
    setConversations(getConversations(user.id))
  }, [user])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-[#f0f2f5] rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span className="text-gray-500 text-sm">Search Messenger</span>
          </div>
        </div>

        {/* Conversation list */}
        {conversations.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#e7f3ff] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.44 5.56 3.7 7.28V22l3.37-1.85c.9.25 1.86.39 2.85.39 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800">No messages yet</p>
            <p className="text-gray-500 text-sm mt-1">Start a conversation with someone!</p>
          </div>
        ) : (
          <div>
            {conversations.map((conv) => (
              <Link
                key={conv.otherUser.id}
                href={`/messages/${conv.otherUser.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors relative"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                    {conv.otherUser.profileImage ? (
                      <img src={conv.otherUser.profileImage} alt={conv.otherUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-base font-bold text-gray-600">{conv.otherUser.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                      {conv.otherUser.name}
                    </p>
                    <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatDate(conv.lastMessage.createdAt)}</p>
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {conv.lastMessage.senderId === user?.id ? 'You: ' : ''}{conv.lastMessage.content}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 bg-[#1877f2] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conv.unreadCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
