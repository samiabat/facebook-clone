import { PostType, CommentType } from '@/types'
import {
  SEED_USERS,
  SEED_POSTS,
  SEED_LIKES,
  SEED_COMMENTS,
  SEED_FRIENDSHIPS,
  SEED_JOBS,
  SeedUser,
  RawPost,
  RawLike,
  RawComment,
  RawFriendship,
  SeedJob,
} from './mockData'

const KEYS = {
  initialized: 'sb_initialized',
  users: 'sb_users',
  posts: 'sb_posts',
  likes: 'sb_likes',
  comments: 'sb_comments',
  friendships: 'sb_friendships',
  session: 'sb_session',
  appliedJobs: 'sb_applied_jobs',
}

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  const item = localStorage.getItem(key)
  if (!item) return defaultValue
  try {
    return JSON.parse(item) as T
  } catch {
    return defaultValue
  }
}

function setItem(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function initStore(): void {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(KEYS.initialized)) return
  setItem(KEYS.users, SEED_USERS)
  setItem(KEYS.posts, SEED_POSTS)
  setItem(KEYS.likes, SEED_LIKES)
  setItem(KEYS.comments, SEED_COMMENTS)
  setItem(KEYS.friendships, SEED_FRIENDSHIPS)
  setItem(KEYS.appliedJobs, [])
  localStorage.setItem(KEYS.initialized, '1')
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36)
}

// --- Users ---

export function getUsers(): SeedUser[] {
  return getItem<SeedUser[]>(KEYS.users, [])
}

export function getUserById(id: string): SeedUser | null {
  return getUsers().find((u) => u.id === id) ?? null
}

export function getUserByEmail(email: string): SeedUser | null {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
}

export function createUser(name: string, email: string, password: string): SeedUser {
  const users = getUsers()
  const newUser: SeedUser = {
    id: generateId(),
    name,
    email,
    password,
    bio: null,
    profileImage: null,
    coverImage: null,
    createdAt: new Date().toISOString(),
  }
  setItem(KEYS.users, [...users, newUser])
  return newUser
}

// --- Session ---

export function getSession(): { userId: string } | null {
  return getItem<{ userId: string } | null>(KEYS.session, null)
}

export function setSession(userId: string): void {
  setItem(KEYS.session, { userId })
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEYS.session)
}

// --- Posts ---

function assemblePost(raw: RawPost): PostType {
  const users = getUsers()
  const likes = getItem<RawLike[]>(KEYS.likes, [])
  const comments = getItem<RawComment[]>(KEYS.comments, [])
  const author = users.find((u) => u.id === raw.authorId)
  const postLikes = likes.filter((l) => l.postId === raw.id)
  const postComments = comments
    .filter((c) => c.postId === raw.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((c): CommentType => {
      const commentAuthor = users.find((u) => u.id === c.authorId)
      return {
        id: c.id,
        content: c.content,
        createdAt: c.createdAt,
        author: {
          id: c.authorId,
          name: commentAuthor?.name ?? 'Unknown',
          profileImage: commentAuthor?.profileImage ?? null,
        },
      }
    })

  return {
    id: raw.id,
    content: raw.content,
    image: raw.image,
    createdAt: raw.createdAt,
    author: {
      id: raw.authorId,
      name: author?.name ?? 'Unknown',
      profileImage: author?.profileImage ?? null,
    },
    likes: postLikes,
    comments: postComments,
    _count: {
      likes: postLikes.length,
      comments: postComments.length,
    },
  }
}

export function getPosts(): PostType[] {
  const raw = getItem<RawPost[]>(KEYS.posts, [])
  return raw
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(assemblePost)
}

export function getUserPosts(userId: string): PostType[] {
  const raw = getItem<RawPost[]>(KEYS.posts, [])
  return raw
    .filter((p) => p.authorId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(assemblePost)
}

export function createPost(authorId: string, content: string, image?: string | null): PostType {
  const posts = getItem<RawPost[]>(KEYS.posts, [])
  const raw: RawPost = {
    id: generateId(),
    content: content.trim(),
    image: image ?? null,
    authorId,
    createdAt: new Date().toISOString(),
  }
  setItem(KEYS.posts, [raw, ...posts])
  return assemblePost(raw)
}

export function toggleLike(userId: string, postId: string): boolean {
  const likes = getItem<RawLike[]>(KEYS.likes, [])
  const existing = likes.find((l) => l.userId === userId && l.postId === postId)
  if (existing) {
    setItem(KEYS.likes, likes.filter((l) => !(l.userId === userId && l.postId === postId)))
    return false
  } else {
    setItem(KEYS.likes, [...likes, { userId, postId }])
    return true
  }
}

export function addComment(userId: string, postId: string, content: string): CommentType {
  const comments = getItem<RawComment[]>(KEYS.comments, [])
  const users = getUsers()
  const author = users.find((u) => u.id === userId)
  const raw: RawComment = {
    id: generateId(),
    content: content.trim(),
    authorId: userId,
    postId,
    createdAt: new Date().toISOString(),
  }
  setItem(KEYS.comments, [...comments, raw])
  return {
    id: raw.id,
    content: raw.content,
    createdAt: raw.createdAt,
    author: {
      id: userId,
      name: author?.name ?? 'Unknown',
      profileImage: author?.profileImage ?? null,
    },
  }
}

// --- Friendships ---

export interface FriendshipWithUsers {
  id: string
  requesterId: string
  addresseeId: string
  status: string
  createdAt: string
  requester: { id: string; name: string; profileImage: string | null }
  addressee: { id: string; name: string; profileImage: string | null }
}

function assembleFriendship(f: RawFriendship): FriendshipWithUsers {
  const users = getUsers()
  const requester = users.find((u) => u.id === f.requesterId)
  const addressee = users.find((u) => u.id === f.addresseeId)
  return {
    ...f,
    requester: {
      id: f.requesterId,
      name: requester?.name ?? 'Unknown',
      profileImage: requester?.profileImage ?? null,
    },
    addressee: {
      id: f.addresseeId,
      name: addressee?.name ?? 'Unknown',
      profileImage: addressee?.profileImage ?? null,
    },
  }
}

export function getFriendships(userId: string): {
  received: FriendshipWithUsers[]
  sent: FriendshipWithUsers[]
  friends: FriendshipWithUsers[]
} {
  const friendships = getItem<RawFriendship[]>(KEYS.friendships, [])
  return {
    received: friendships
      .filter((f) => f.addresseeId === userId && f.status === 'PENDING')
      .map(assembleFriendship),
    sent: friendships
      .filter((f) => f.requesterId === userId && f.status === 'PENDING')
      .map(assembleFriendship),
    friends: friendships
      .filter((f) => (f.requesterId === userId || f.addresseeId === userId) && f.status === 'ACCEPTED')
      .map(assembleFriendship),
  }
}

export function sendFriendRequest(
  requesterId: string,
  addresseeId: string
): FriendshipWithUsers | null {
  const friendships = getItem<RawFriendship[]>(KEYS.friendships, [])
  const existing = friendships.find(
    (f) =>
      (f.requesterId === requesterId && f.addresseeId === addresseeId) ||
      (f.requesterId === addresseeId && f.addresseeId === requesterId)
  )
  if (existing) return null

  const raw: RawFriendship = {
    id: generateId(),
    requesterId,
    addresseeId,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  }
  setItem(KEYS.friendships, [...friendships, raw])
  return assembleFriendship(raw)
}

export function respondToRequest(friendshipId: string, status: 'ACCEPTED' | 'DECLINED'): void {
  const friendships = getItem<RawFriendship[]>(KEYS.friendships, [])
  if (status === 'DECLINED') {
    setItem(KEYS.friendships, friendships.filter((f) => f.id !== friendshipId))
  } else {
    setItem(
      KEYS.friendships,
      friendships.map((f) => (f.id === friendshipId ? { ...f, status } : f))
    )
  }
}

// --- Jobs ---

export function getJobs(): SeedJob[] {
  return SEED_JOBS
}

export function getAppliedJobs(userId: string): string[] {
  const applications = getItem<{ userId: string; jobId: string }[]>(KEYS.appliedJobs, [])
  return applications.filter((a) => a.userId === userId).map((a) => a.jobId)
}

export function applyToJob(userId: string, jobId: string): void {
  const applications = getItem<{ userId: string; jobId: string }[]>(KEYS.appliedJobs, [])
  const existing = applications.find((a) => a.userId === userId && a.jobId === jobId)
  if (!existing) {
    setItem(KEYS.appliedJobs, [...applications, { userId, jobId }])
  }
}
