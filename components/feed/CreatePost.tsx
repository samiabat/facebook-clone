'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createPost } from '@/lib/localStore'

interface CreatePostProps {
  onPostCreated: (post: any) => void
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return
    setLoading(true)
    const post = createPost(user.id, content)
    onPostCreated(post)
    setContent('')
    setShowForm(false)
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-4">
      {/* Top row: avatar + input prompt */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="font-bold text-gray-600 text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex-1 bg-[#f0f2f5] hover:bg-gray-200 rounded-full px-4 py-2.5 text-left text-gray-500 text-sm transition-colors"
        >
          What&apos;s on your mind, {user?.name?.split(' ')[0]}?
        </button>
      </div>

      {/* Expanded form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user?.name?.split(' ')[0]}?`}
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#1877f2] min-h-[100px] text-gray-800"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => { setShowForm(false); setContent('') }}
              className="px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() || loading}
              className="px-6 py-1.5 bg-[#1877f2] text-white rounded-lg font-semibold text-sm hover:bg-[#166fe5] transition-colors disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      )}

      {/* Divider */}
      <hr className="border-gray-200 mb-3" />

      {/* Action buttons row */}
      <div className="flex items-center justify-around">
        <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          <span className="text-gray-600 font-semibold text-sm hidden sm:block">Live video</span>
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
        >
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
          <span className="text-gray-600 font-semibold text-sm hidden sm:block">Photo/video</span>
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
        >
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <span className="text-gray-600 font-semibold text-sm hidden sm:block">Feeling/activity</span>
        </button>
      </div>
    </div>
  )
}
