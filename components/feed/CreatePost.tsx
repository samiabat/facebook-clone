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
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="font-bold text-gray-600">{user?.name?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-left text-gray-500 transition-colors"
        >
          What&apos;s on your mind, {user?.name?.split(' ')[0]}?
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user?.name?.split(' ')[0]}?`}
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#1877f2] min-h-[100px]"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => { setShowForm(false); setContent('') }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() || loading}
              className="px-6 py-2 bg-[#1877f2] text-white rounded-lg font-semibold hover:bg-[#166fe5] transition-colors disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
