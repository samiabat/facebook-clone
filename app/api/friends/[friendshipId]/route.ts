import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ friendshipId: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { friendshipId } = await params
  const { status } = await req.json()
  const userId = (session.user as any).id

  const friendship = await prisma.friendship.findUnique({ where: { id: friendshipId } })
  if (!friendship || friendship.addresseeId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const updated = await prisma.friendship.update({
    where: { id: friendshipId },
    data: { status },
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ friendshipId: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { friendshipId } = await params
  const userId = (session.user as any).id

  const friendship = await prisma.friendship.findUnique({ where: { id: friendshipId } })
  if (!friendship || (friendship.requesterId !== userId && friendship.addresseeId !== userId)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.friendship.delete({ where: { id: friendshipId } })
  return NextResponse.json({ success: true })
}
