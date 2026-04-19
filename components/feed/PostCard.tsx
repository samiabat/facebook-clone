'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PostType } from '@/types'
import { toggleLike, addComment } from '@/lib/localStore'

export default function PostCard({ post: initialPost }: { post: PostType }) {
  const { user } = useAuth()
  const [post, setPost] = useState(initialPost)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const userId = user?.id
  const isLiked = userId ? post.likes.some((l) => l.userId === userId) : false

  const handleLike = () => {
    if (!userId) return
    const liked = toggleLike(userId, post.id)
    setPost((prev) => ({
      ...prev,
      likes: liked
        ? [...prev.likes, { userId }]
        : prev.likes.filter((l) => l.userId !== userId),
      _count: { ...prev._count, likes: prev._count.likes + (liked ? 1 : -1) },
    }))
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !userId) return
    setSubmitting(true)
    const newComment = addComment(userId, post.id, comment)
    setPost((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
      _count: { ...prev._count, comments: prev._count.comments + 1 },
    }))
    setComment('')
    setSubmitting(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden">
      {/* Post header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.id}`}>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              {post.author.profileImage ? (
                <img src={post.author.profileImage} alt={post.author.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-gray-600">{post.author.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </Link>
          <div>
            <Link href={`/profile/${post.author.id}`} className="font-semibold text-gray-900 text-sm hover:underline">
              {post.author.name}
            </Link>
            <div className="flex items-center gap-1">
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
              <span className="text-gray-400 text-xs">·</span>
              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V4.07c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="mt-3 w-full rounded-lg max-h-96 object-cover" />
        )}
      </div>

      {/* Counts */}
      {(post._count.likes > 0 || post._count.comments > 0) && (
        <div className="px-4 py-2 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100">
          <span className="flex items-center gap-1">
            {post._count.likes > 0 && (
              <>
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1877f2] text-xs">👍</span>
                <span>{post._count.likes}</span>
              </>
            )}
          </span>
          <button onClick={() => setShowComments(!showComments)} className="hover:underline">
            {post._count.comments > 0 && `${post._count.comments} comment${post._count.comments !== 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-2 py-1 border-t border-gray-100 flex gap-0">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm transition-colors ${
            isLiked ? 'text-[#1877f2] hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isLiked ? 0 : 2} viewBox="0 0 24 24">
            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" strokeLinejoin="round" />
          </svg>
          Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-500 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          Share
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {c.author.profileImage ? (
                  <img src={c.author.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-gray-600">{c.author.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="bg-[#f0f2f5] rounded-2xl px-3 py-2 max-w-[85%]">
                <p className="font-semibold text-xs text-gray-900">{c.author.name}</p>
                <p className="text-sm text-gray-700">{c.content}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className="flex gap-2 mt-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600 overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-[#f0f2f5] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1877f2] pr-10"
              />
              <button
                type="submit"
                disabled={!comment.trim() || submitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1877f2] disabled:text-gray-400 font-bold text-lg leading-none"
              >
                ↵
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
