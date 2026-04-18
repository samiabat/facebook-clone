'use client'

import { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import PostCard from './PostCard'
import { PostType } from '@/types'

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <CreatePost onPostCreated={(post) => setPosts((prev) => [post, ...prev])} />
      {loading && <div className="text-center py-8 text-gray-500">Loading posts...</div>}
      {!loading && posts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No posts yet. Be the first to post!
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
