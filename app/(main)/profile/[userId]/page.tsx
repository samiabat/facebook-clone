'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useParams } from 'next/navigation'
import PostCard from '@/components/feed/PostCard'
import { formatDate } from '@/lib/utils'
import { getUserById, getUserPosts, getFriendships, sendFriendRequest } from '@/lib/localStore'
import { FriendshipWithUsers } from '@/lib/localStore'
import { PostType } from '@/types'

const PROFILE_TABS = ['Posts', 'About', 'Friends', 'Photos']

export default function ProfilePage() {
  const params = useParams()
  const { user } = useAuth()
  const [profileUser, setProfileUser] = useState<any>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [friendship, setFriendship] = useState<FriendshipWithUsers | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Posts')

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
    ? 'Add friend'
    : friendship.status === 'ACCEPTED'
    ? '✓ Friends'
    : friendship.requesterId === currentUserId
    ? 'Request sent'
    : 'Respond'

  return (
    <div className="max-w-2xl mx-auto -mt-4">
      {/* Cover + Profile header card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
        {/* Cover photo */}
        <div className="h-52 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative">
          {profileUser.coverImage && (
            <img src={profileUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
          )}
          {isOwnProfile && (
            <button className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors shadow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              Edit cover photo
            </button>
          )}
        </div>

        {/* Profile info */}
        <div className="px-6 pb-4">
          <div className="flex items-end justify-between -mt-14 mb-3 flex-wrap gap-3">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-300 overflow-hidden flex items-center justify-center shadow-md">
                {profileUser.profileImage ? (
                  <img src={profileUser.profileImage} alt={profileUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-gray-600">{profileUser.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              {isOwnProfile && (
                <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#e4e6eb] hover:bg-gray-300 rounded-full flex items-center justify-center border-2 border-white transition-colors">
                  <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>
              )}
            </div>

            {!isOwnProfile ? (
              <div className="flex gap-2 items-center mt-4 sm:mt-0 flex-wrap">
                <button
                  onClick={handleAddFriend}
                  disabled={friendship?.status === 'ACCEPTED' || friendship?.requesterId === currentUserId}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    friendship?.status === 'ACCEPTED'
                      ? 'bg-[#e4e6eb] text-gray-800 cursor-default'
                      : 'bg-[#1877f2] text-white hover:bg-[#166fe5]'
                  } disabled:cursor-default`}
                >
                  {friendship?.status !== 'ACCEPTED' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                  {friendLabel}
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#e4e6eb] text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                  Message
                </button>
              </div>
            ) : (
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#e4e6eb] text-gray-800 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors mt-4 sm:mt-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                Edit profile
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
          {profileUser.bio && <p className="text-gray-600 mt-1">{profileUser.bio}</p>}
          <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
            <span>{profileUser._count?.posts ?? 0} posts</span>
            <span>·</span>
            <span>Joined {formatDate(profileUser.createdAt)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-200 px-4">
          {PROFILE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold transition-colors border-b-[3px] ${
                activeTab === tab
                  ? 'border-[#1877f2] text-[#1877f2]'
                  : 'border-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'Posts' && (
        <div>
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              {isOwnProfile ? "You haven't posted anything yet." : `${profileUser.name} hasn't posted anything yet.`}
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {activeTab === 'About' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">About</h2>
          <div className="space-y-3">
            {profileUser.bio && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <p className="text-gray-700 text-sm">{profileUser.bio}</p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
              <p className="text-gray-700 text-sm">Joined {formatDate(profileUser.createdAt)}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Friends' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Friends</h2>
          <p className="text-gray-500 text-sm">Friends list is private.</p>
        </div>
      )}

      {activeTab === 'Photos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Photos</h2>
          <p className="text-gray-500 text-sm">No photos yet.</p>
        </div>
      )}
    </div>
  )
}
