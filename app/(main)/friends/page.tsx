'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { getFriendships, respondToRequest, getUsers } from '@/lib/localStore'
import { FriendshipWithUsers } from '@/lib/localStore'
import { SeedUser } from '@/lib/mockData'

const TABS = ['Home', 'Friend Requests', 'Suggestions', 'All Friends']

export default function FriendsPage() {
  const { user } = useAuth()
  const [data, setData] = useState<{
    received: FriendshipWithUsers[]
    sent: FriendshipWithUsers[]
    friends: FriendshipWithUsers[]
  }>({ received: [], sent: [], friends: [] })
  const [suggestions, setSuggestions] = useState<SeedUser[]>([])
  const [activeTab, setActiveTab] = useState('Home')

  useEffect(() => {
    if (!user) return
    const d = getFriendships(user.id)
    setData(d)
    const friendIds = new Set([
      ...d.friends.map((f) => (f.requesterId === user.id ? f.addresseeId : f.requesterId)),
      ...d.sent.map((f) => f.addresseeId),
      ...d.received.map((f) => f.requesterId),
      user.id,
    ])
    setSuggestions(getUsers().filter((u) => !friendIds.has(u.id)))
  }, [user])

  const handleRespond = (friendshipId: string, status: 'ACCEPTED' | 'DECLINED') => {
    const accepted = data.received.find((f) => f.id === friendshipId)
    respondToRequest(friendshipId, status)
    setData((prev) => ({
      ...prev,
      received: prev.received.filter((f) => f.id !== friendshipId),
      friends: status === 'ACCEPTED' && accepted ? [...prev.friends, { ...accepted, status: 'ACCEPTED' }] : prev.friends,
    }))
  }

  const currentUserId = user?.id

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors relative ${
              activeTab === tab
                ? 'bg-[#dce8ff] text-[#1877f2]'
                : 'bg-[#e4e6eb] text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
            {tab === 'Friend Requests' && data.received.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {data.received.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Home tab — requests + suggestions */}
      {activeTab === 'Home' && (
        <div className="space-y-8">
          {data.received.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Friend Requests ({data.received.length})</h2>
                <button onClick={() => setActiveTab('Friend Requests')} className="text-[#1877f2] text-sm font-semibold hover:underline">See all</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {data.received.slice(0, 3).map((f) => (
                  <FriendRequestCard
                    key={f.id}
                    person={f.requester}
                    onConfirm={() => handleRespond(f.id, 'ACCEPTED')}
                    onDelete={() => handleRespond(f.id, 'DECLINED')}
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">People you may know</h2>
              <button onClick={() => setActiveTab('Suggestions')} className="text-[#1877f2] text-sm font-semibold hover:underline">See all</button>
            </div>
            {suggestions.length === 0 ? (
              <p className="text-gray-500 text-sm">No suggestions right now.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {suggestions.slice(0, 6).map((u) => (
                  <SuggestionCard key={u.id} person={u} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Friend Requests tab */}
      {activeTab === 'Friend Requests' && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Friend Requests ({data.received.length})</h2>
          {data.received.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-4xl mb-3">👥</p>
              <p className="font-semibold text-gray-800">No pending requests</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data.received.map((f) => (
                <FriendRequestCard
                  key={f.id}
                  person={f.requester}
                  onConfirm={() => handleRespond(f.id, 'ACCEPTED')}
                  onDelete={() => handleRespond(f.id, 'DECLINED')}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Suggestions tab */}
      {activeTab === 'Suggestions' && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">People you may know</h2>
          {suggestions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-4xl mb-3">👥</p>
              <p className="font-semibold text-gray-800">No suggestions right now</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {suggestions.map((u) => (
                <SuggestionCard key={u.id} person={u} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* All Friends tab */}
      {activeTab === 'All Friends' && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Friends ({data.friends.length})</h2>
          {data.friends.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-4xl mb-3">👥</p>
              <p className="font-semibold text-gray-800">No friends yet</p>
              <p className="text-gray-500 text-sm mt-1">Visit profiles to send friend requests!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data.friends.map((f) => {
                const friend = f.requesterId === currentUserId ? f.addressee : f.requester
                return (
                  <Link
                    key={f.id}
                    href={`/profile/${friend.id}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-28 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      {friend.profileImage ? (
                        <img src={friend.profileImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl font-bold text-white">{friend.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-gray-900 text-sm">{friend.name}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

function FriendRequestCard({ person, onConfirm, onDelete }: { person: any; onConfirm: () => void; onDelete: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <Link href={`/profile/${person.id}`} className="block">
        <div className="h-28 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
          {person.profileImage ? (
            <img src={person.profileImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-white">{person.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="p-3 pb-2">
          <p className="font-semibold text-gray-900 text-sm">{person.name}</p>
        </div>
      </Link>
      <div className="px-3 pb-3 flex flex-col gap-1.5">
        <button onClick={onConfirm} className="w-full py-1.5 bg-[#1877f2] text-white rounded-lg text-sm font-semibold hover:bg-[#166fe5] transition-colors">
          Confirm
        </button>
        <button onClick={onDelete} className="w-full py-1.5 bg-[#e4e6eb] text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
          Delete
        </button>
      </div>
    </div>
  )
}

function SuggestionCard({ person }: { person: any }) {
  const [added, setAdded] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <Link href={`/profile/${person.id}`} className="block">
        <div className="h-28 bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center overflow-hidden">
          {person.profileImage ? (
            <img src={person.profileImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-white">{person.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="p-3 pb-2">
          <p className="font-semibold text-gray-900 text-sm">{person.name}</p>
          {person.bio && <p className="text-gray-500 text-xs mt-0.5 truncate">{person.bio}</p>}
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button
          onClick={() => setAdded(!added)}
          className={`w-full py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            added
              ? 'bg-[#e4e6eb] text-gray-800 hover:bg-gray-300'
              : 'bg-[#e7f3ff] text-[#1877f2] hover:bg-[#dce8ff]'
          }`}
        >
          {added ? '✓ Request sent' : '+ Add friend'}
        </button>
      </div>
    </div>
  )
}
