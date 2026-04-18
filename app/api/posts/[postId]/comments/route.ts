import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })

  const { postId } = await params

  const comment = await prisma.comment.create({
    data: { content: content.trim(), authorId: (session.user as any).id, postId },
    include: { author: { select: { id: true, name: true, profileImage: true } } },
  })

  return NextResponse.json(comment, { status: 201 })
}
