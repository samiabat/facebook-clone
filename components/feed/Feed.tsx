'use client'

import { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import PostCard from './PostCard'
import Stories from './Stories'
import { PostType } from '@/types'
import { getPosts } from '@/lib/localStore'

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    setPosts(getPosts())
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <Stories />
      <CreatePost onPostCreated={(post) => setPosts((prev) => [post, ...prev])} />
      {posts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          No posts yet. Be the first to post!
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
