import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { userId } = await params

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      profileImage: true,
      coverImage: true,
      createdAt: true,
      posts: {
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
      },
      _count: { select: { posts: true, sentRequests: true } },
    },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json(user)
}
