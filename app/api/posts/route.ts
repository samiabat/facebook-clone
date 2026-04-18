import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, name: true, profileImage: true } },
      likes: { select: { userId: true } },
      comments: {
        include: { author: { select: { id: true, name: true, profileImage: true } } },
        orderBy: { createdAt: 'asc' },
      },
      _count: { select: { likes: true, comments: true } },
    },
    take: 20,
  })

  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content, image } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content is required' }, { status: 400 })

  const post = await prisma.post.create({
    data: { content: content.trim(), image, authorId: (session.user as any).id },
    include: {
      author: { select: { id: true, name: true, profileImage: true } },
      likes: { select: { userId: true } },
      comments: {
        include: { author: { select: { id: true, name: true, profileImage: true } } },
      },
      _count: { select: { likes: true, comments: true } },
    },
  })

  return NextResponse.json(post, { status: 201 })
}
