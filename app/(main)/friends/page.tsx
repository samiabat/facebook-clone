'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function FriendsPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>({ received: [], sent: [], friends: [] })
  const [loading, setLoading] = useState(true)

  const currentUserId = (session?.user as any)?.id

  useEffect(() => {
    fetch('/api/friends')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }, [])

  const handleRespond = async (friendshipId: string, status: 'ACCEPTED' | 'DECLINED') => {
    const res = await fetch(`/api/friends/${friendshipId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      const updated = await res.json()
      setData((prev: any) => ({
        ...prev,
        received: prev.received.filter((f: any) => f.id !== friendshipId),
        friends: status === 'ACCEPTED' ? [...prev.friends, updated] : prev.friends,
      }))
    }
  }

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {data.received?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Friend Requests ({data.received.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.received.map((f: any) => (
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
          Friends ({data.friends?.length ?? 0})
        </h2>
        {!data.friends?.length ? (
          <p className="text-gray-500">No friends yet. Visit profiles to send friend requests!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.friends.map((f: any) => {
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

      {data.sent?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pending Requests Sent ({data.sent.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.sent.map((f: any) => (
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
