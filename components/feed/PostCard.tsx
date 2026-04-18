'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { PostType } from '@/types'

export default function PostCard({ post: initialPost }: { post: PostType }) {
  const { data: session } = useSession()
  const [post, setPost] = useState(initialPost)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const userId = (session?.user as any)?.id
  const isLiked = post.likes.some((l) => l.userId === userId)

  const handleLike = async () => {
    const res = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' })
    if (res.ok) {
      const { liked } = await res.json()
      setPost((prev) => ({
        ...prev,
        likes: liked ? [...prev.likes, { userId }] : prev.likes.filter((l) => l.userId !== userId),
        _count: { ...prev._count, likes: prev._count.likes + (liked ? 1 : -1) },
      }))
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    setSubmitting(true)
    const res = await fetch(`/api/posts/${post.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment }),
    })
    if (res.ok) {
      const newComment = await res.json()
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
        _count: { ...prev._count, comments: prev._count.comments + 1 },
      }))
      setComment('')
    }
    setSubmitting(false)
  }

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="flex items-center gap-3 p-4">
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
          <Link href={`/profile/${post.author.id}`} className="font-semibold text-gray-800 hover:underline">
            {post.author.name}
          </Link>
          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="mt-3 w-full rounded-lg max-h-96 object-cover" />
        )}
      </div>

      {(post._count.likes > 0 || post._count.comments > 0) && (
        <div className="px-4 py-2 flex justify-between text-sm text-gray-500 border-t border-gray-100">
          <span>{post._count.likes > 0 && `👍 ${post._count.likes}`}</span>
          <button onClick={() => setShowComments(!showComments)} className="hover:underline">
            {post._count.comments > 0 && `${post._count.comments} comment${post._count.comments !== 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      <div className="px-4 py-1 border-t border-gray-100 flex gap-1">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm transition-colors ${
            isLiked ? 'text-[#1877f2] bg-blue-50 hover:bg-blue-100' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          👍 Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
        >
          💬 Comment
        </button>
      </div>

      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                {c.author.profileImage ? (
                  <img src={c.author.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-gray-600">{c.author.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="bg-gray-100 rounded-2xl px-3 py-2">
                <p className="font-semibold text-xs text-gray-800">{c.author.name}</p>
                <p className="text-sm text-gray-700">{c.content}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className="flex gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1877f2] pr-10"
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
