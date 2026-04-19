'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getUsers, getFriendships } from '@/lib/localStore'
import { SeedUser } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'

interface Notification {
  id: string
  type: 'friend_request' | 'like' | 'comment' | 'birthday' | 'suggestion'
  message: string
  time: string
  read: boolean
  avatar?: string | null
  href?: string
  avatarFallback?: string
}

const STATIC_NOTIFICATIONS: Notification[] = [
  {
    id: 'n_like1',
    type: 'like',
    message: 'Bob Smith liked your photo.',
    time: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    avatar: 'https://i.pravatar.cc/300?img=12',
    avatarFallback: 'B',
    href: '/',
  },
  {
    id: 'n_comment1',
    type: 'comment',
    message: 'Carol Williams commented on your post: "Amazing! Keep it up! 🎉"',
    time: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: false,
    avatar: 'https://i.pravatar.cc/300?img=25',
    avatarFallback: 'C',
    href: '/',
  },
  {
    id: 'n_like2',
    type: 'like',
    message: 'Emma Davis and 3 others liked your post.',
    time: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    read: false,
    avatar: 'https://i.pravatar.cc/300?img=31',
    avatarFallback: 'E',
    href: '/',
  },
  {
    id: 'n_birthday1',
    type: 'birthday',
    message: "Today is Frank Miller's birthday! Send him a message 🎂",
    time: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: true,
    avatar: 'https://i.pravatar.cc/300?img=68',
    avatarFallback: 'F',
    href: '/profile/u6',
  },
  {
    id: 'n_comment2',
    type: 'comment',
    message: 'David Brown replied to your comment on his post.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    avatar: 'https://i.pravatar.cc/300?img=59',
    avatarFallback: 'D',
    href: '/',
  },
  {
    id: 'n_suggestion1',
    type: 'suggestion',
    message: 'You have 2 new friend suggestions. People you may know!',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    href: '/friends',
  },
]

const NOTIFICATION_ICONS: Record<string, React.ReactNode> = {
  like: (
    <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center">
      <span className="text-base">👍</span>
    </div>
  ),
  comment: (
    <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    </div>
  ),
  friend_request: (
    <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  ),
  birthday: (
    <div className="w-8 h-8 rounded-full bg-[#f02849] flex items-center justify-center">
      <span className="text-base">🎂</span>
    </div>
  ),
  suggestion: (
    <div className="w-8 h-8 rounded-full bg-[#42b72a] flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    </div>
  ),
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>(STATIC_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    if (!user) return
    // Inject friend request notifications from real data
    const friendData = getFriendships(user.id)
    const friendRequestNotifs: Notification[] = friendData.received.map((f) => ({
      id: `fr_${f.id}`,
      type: 'friend_request' as const,
      message: `${f.requester.name} sent you a friend request.`,
      time: f.createdAt,
      read: false,
      avatar: f.requester.profileImage,
      avatarFallback: f.requester.name.charAt(0).toUpperCase(),
      href: `/friends`,
    }))
    setNotifications([...friendRequestNotifs, ...STATIC_NOTIFICATIONS])
  }, [user])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const displayed = activeTab === 'unread' ? notifications.filter((n) => !n.read) : notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[#1877f2] text-sm font-semibold hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#dce8ff] text-[#1877f2]'
                  : 'bg-[#e4e6eb] text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors relative ${
                activeTab === 'unread'
                  ? 'bg-[#dce8ff] text-[#1877f2]'
                  : 'bg-[#e4e6eb] text-gray-700 hover:bg-gray-300'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications list */}
        {displayed.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#e7f3ff] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800">No notifications</p>
            <p className="text-gray-500 text-sm mt-1">
              {activeTab === 'unread' ? 'You\'re all caught up!' : 'Nothing to show here yet.'}
            </p>
          </div>
        ) : (
          <div>
            {displayed.map((notif) => (
              <Link
                key={notif.id}
                href={notif.href ?? '#'}
                onClick={() => markRead(notif.id)}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  !notif.read ? 'bg-[#f0f7ff]' : ''
                }`}
              >
                {/* Avatar with icon overlay */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    {notif.avatar ? (
                      <img src={notif.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold text-gray-500">{notif.avatarFallback ?? '🔔'}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    {NOTIFICATION_ICONS[notif.type]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {notif.message}
                  </p>
                  <p className={`text-xs mt-0.5 ${!notif.read ? 'text-[#1877f2] font-semibold' : 'text-gray-400'}`}>
                    {formatDate(notif.time)}
                  </p>
                </div>

                {!notif.read && (
                  <span className="w-3 h-3 bg-[#1877f2] rounded-full flex-shrink-0"></span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
