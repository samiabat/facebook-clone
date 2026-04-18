export interface UserType {
  id: string
  name: string
  email: string
  bio?: string | null
  profileImage?: string | null
  coverImage?: string | null
  createdAt: string
}

export interface PostType {
  id: string
  content: string
  image?: string | null
  createdAt: string
  author: {
    id: string
    name: string
    profileImage?: string | null
  }
  likes: { userId: string }[]
  comments: CommentType[]
  _count: {
    likes: number
    comments: number
  }
}

export interface CommentType {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    profileImage?: string | null
  }
}

export interface FriendshipType {
  id: string
  requesterId: string
  addresseeId: string
  status: string
  requester: { id: string; name: string; profileImage?: string | null }
  addressee: { id: string; name: string; profileImage?: string | null }
}
