'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getMessages, sendMessage, markMessagesRead, getUserById, MessageWithUsers } from '@/lib/localStore'
import { formatDate } from '@/lib/utils'

export default function ChatPage() {
  const { userId: otherUserId } = useParams<{ userId: string }>()
  const { user } = useAuth()
  const [messages, setMessages] = useState<MessageWithUsers[]>([])
  const [input, setInput] = useState('')
  const [otherUser, setOtherUser] = useState<{ id: string; name: string; profileImage: string | null } | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user || !otherUserId) return
    const u = getUserById(otherUserId)
    setOtherUser(u ? { id: u.id, name: u.name, profileImage: u.profileImage } : null)
    setMessages(getMessages(user.id, otherUserId))
    markMessagesRead(user.id, otherUserId)
  }, [user, otherUserId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !user || !otherUserId) return
    const msg = sendMessage(user.id, otherUserId, input)
    setMessages((prev) => [...prev, msg])
    setInput('')
  }

  if (!otherUser) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        User not found.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-5.5rem)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
        <Link href="/messages" className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </Link>
        <Link href={`/profile/${otherUser.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              {otherUser.profileImage ? (
                <img src={otherUser.profileImage} alt={otherUser.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-gray-600">{otherUser.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{otherUser.name}</p>
            <p className="text-xs text-green-500 font-medium">Active now</p>
          </div>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#1877f2] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#1877f2] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mx-auto mb-3 flex items-center justify-center">
              {otherUser.profileImage ? (
                <img src={otherUser.profileImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-gray-500">{otherUser.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <p className="font-semibold text-gray-900">{otherUser.name}</p>
            <p className="text-gray-500 text-sm mt-1">Say hello to start the conversation!</p>
          </div>
        )}
        {messages.map((msg) => {
          const isMine = msg.senderId === user?.id
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
              {!isMine && (
                <div className="w-7 h-7 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {otherUser.profileImage ? (
                    <img src={otherUser.profileImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-gray-600">{otherUser.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              )}
              <div className={`max-w-[70%] ${isMine ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    isMine
                      ? 'bg-[#1877f2] text-white rounded-br-sm'
                      : 'bg-[#f0f2f5] text-gray-900 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <p className="text-[10px] text-gray-400 mt-1 px-1">{formatDate(msg.createdAt)}</p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0">
        <button type="button" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#1877f2] transition-colors flex-shrink-0">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
        <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-4 py-2 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${otherUser.name}...`}
            className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800"
          />
          <button type="button" className="text-gray-500 hover:text-[#1877f2] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full bg-[#1877f2] hover:bg-[#166fe5] flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  )
}
