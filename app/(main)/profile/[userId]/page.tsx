'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useParams } from 'next/navigation'
import PostCard from '@/components/feed/PostCard'
import { formatDate } from '@/lib/utils'
import { getUserById, getUserPosts, getFriendships, sendFriendRequest } from '@/lib/localStore'
import { FriendshipWithUsers } from '@/lib/localStore'
import { PostType } from '@/types'

export default function ProfilePage() {
  const params = useParams()
  const { user } = useAuth()
  const [profileUser, setProfileUser] = useState<any>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [friendship, setFriendship] = useState<FriendshipWithUsers | null>(null)
  const [loading, setLoading] = useState(true)

  const currentUserId = user?.id
  const profileUserId = params.userId as string
  const isOwnProfile = currentUserId === profileUserId

  useEffect(() => {
    if (!profileUserId) return
    const u = getUserById(profileUserId)
    if (u) {
      const userPosts = getUserPosts(profileUserId)
      setProfileUser({ ...u, _count: { posts: userPosts.length } })
      setPosts(userPosts)
    }
    setLoading(false)

    if (!isOwnProfile && currentUserId) {
      const friendData = getFriendships(currentUserId)
      const all = [...friendData.friends, ...friendData.sent, ...friendData.received]
      const rel = all.find(
        (f) => f.requesterId === profileUserId || f.addresseeId === profileUserId
      )
      setFriendship(rel ?? null)
    }
  }, [profileUserId, isOwnProfile, currentUserId])

  const handleAddFriend = () => {
    if (!currentUserId || !profileUserId) return
    const result = sendFriendRequest(currentUserId, profileUserId)
    if (result) setFriendship(result)
  }

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>
  if (!profileUser) return <div className="text-center py-8 text-gray-500">User not found.</div>

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
          {profileUser.coverImage && (
            <img src={profileUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="px-6 pb-4">
          <div className="flex items-end justify-between -mt-12 mb-3">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300 overflow-hidden flex items-center justify-center">
              {profileUser.profileImage ? (
                <img src={profileUser.profileImage} alt={profileUser.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-gray-600">{profileUser.name.charAt(0).toUpperCase()}</span>
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
          <h1 className="text-2xl font-bold text-gray-800">{profileUser.name}</h1>
          {profileUser.bio && <p className="text-gray-600 mt-1">{profileUser.bio}</p>}
          <p className="text-gray-500 text-sm mt-1">Joined {formatDate(profileUser.createdAt)}</p>
          <p className="text-gray-500 text-sm">{profileUser._count?.posts ?? 0} posts</p>
        </div>
      </div>

      <div>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            {isOwnProfile ? "You haven't posted anything yet." : `${profileUser.name} hasn't posted anything yet.`}
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}
