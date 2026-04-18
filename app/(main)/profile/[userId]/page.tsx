'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import PostCard from '@/components/feed/PostCard'
import { formatDate } from '@/lib/utils'

export default function ProfilePage() {
  const params = useParams()
  const { data: session } = useSession()
  const [user, setUser] = useState<any>(null)
  const [friendship, setFriendship] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const currentUserId = (session?.user as any)?.id
  const isOwnProfile = currentUserId === params.userId

  useEffect(() => {
    if (!params.userId) return
    fetch(`/api/users/${params.userId}`)
      .then((r) => r.json())
      .then((data) => { setUser(data); setLoading(false) })

    if (!isOwnProfile) {
      fetch('/api/friends')
        .then((r) => r.json())
        .then((data) => {
          if (!data || data.error) return
          const all = [...(data.friends || []), ...(data.sent || []), ...(data.received || [])]
          const rel = all.find((f: any) =>
            f.requesterId === params.userId || f.addresseeId === params.userId
          )
          setFriendship(rel || null)
        })
    }
  }, [params.userId, isOwnProfile])

  const handleAddFriend = async () => {
    const res = await fetch('/api/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresseeId: params.userId }),
    })
    if (res.ok) setFriendship(await res.json())
  }

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>
  if (!user || user.error) return <div className="text-center py-8 text-gray-500">User not found.</div>

  const friendLabel = !friendship
    ? '+ Add Friend'
    : friendship.status === 'ACCEPTED'
    ? '✓ Friends'
    : friendship.requesterId === currentUserId
    ? 'Request Sent'
    : 'Respond'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600">
          {user.coverImage && (
            <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="px-6 pb-4">
          <div className="flex items-end justify-between -mt-12 mb-3">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300 overflow-hidden flex items-center justify-center">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-gray-600">{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {!isOwnProfile && (
              <button
                onClick={handleAddFriend}
                disabled={friendship?.status === 'ACCEPTED' || friendship?.requesterId === currentUserId}
                className="px-4 py-2 bg-[#1877f2] text-white rounded-lg font-semibold text-sm hover:bg-[#166fe5] transition-colors disabled:bg-gray-200 disabled:text-gray-600"
              >
                {friendLabel}
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          {user.bio && <p className="text-gray-600 mt-1">{user.bio}</p>}
          <p className="text-gray-500 text-sm mt-1">Joined {formatDate(user.createdAt)}</p>
          <p className="text-gray-500 text-sm">{user._count?.posts ?? 0} posts</p>
        </div>
      </div>

      <div>
        {(!user.posts || user.posts.length === 0) ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            {isOwnProfile ? "You haven't posted anything yet." : `${user.name} hasn't posted anything yet.`}
          </div>
        ) : (
          user.posts.map((post: any) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
