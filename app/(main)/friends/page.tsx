'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { getFriendships, respondToRequest } from '@/lib/localStore'
import { FriendshipWithUsers } from '@/lib/localStore'

export default function FriendsPage() {
  const { user } = useAuth()
  const [data, setData] = useState<{
    received: FriendshipWithUsers[]
    sent: FriendshipWithUsers[]
    friends: FriendshipWithUsers[]
  }>({ received: [], sent: [], friends: [] })

  useEffect(() => {
    if (!user) return
    setData(getFriendships(user.id))
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
    <div className="max-w-2xl mx-auto space-y-6">
      {data.received.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Friend Requests ({data.received.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.received.map((f) => (
              <div key={f.id} className="bg-white rounded-lg shadow p-4">
                <Link href={`/profile/${f.requester.id}`} className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {f.requester.profileImage ? (
                      <img src={f.requester.profileImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-gray-600">{f.requester.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-800">{f.requester.name}</span>
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRespond(f.id, 'ACCEPTED')}
                    className="flex-1 bg-[#1877f2] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#166fe5]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleRespond(f.id, 'DECLINED')}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Friends ({data.friends.length})
        </h2>
        {data.friends.length === 0 ? (
          <p className="text-gray-500">No friends yet. Visit profiles to send friend requests!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.friends.map((f) => {
              const friend = f.requesterId === currentUserId ? f.addressee : f.requester
              return (
                <Link
                  key={f.id}
                  href={`/profile/${friend.id}`}
                  className="bg-white rounded-lg shadow p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {friend.profileImage ? (
                      <img src={friend.profileImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-gray-600">{friend.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-800">{friend.name}</span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {data.sent.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pending Requests Sent ({data.sent.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.sent.map((f) => (
              <Link
                key={f.id}
                href={`/profile/${f.addressee.id}`}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {f.addressee.profileImage ? (
                    <img src={f.addressee.profileImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-gray-600">{f.addressee.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{f.addressee.name}</p>
                  <p className="text-xs text-gray-500">Request pending</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
