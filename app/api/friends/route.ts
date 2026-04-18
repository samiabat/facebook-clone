import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id

  const [received, sent, friends] = await Promise.all([
    prisma.friendship.findMany({
      where: { addresseeId: userId, status: 'PENDING' },
      include: { requester: { select: { id: true, name: true, profileImage: true } } },
    }),
    prisma.friendship.findMany({
      where: { requesterId: userId, status: 'PENDING' },
      include: { addressee: { select: { id: true, name: true, profileImage: true } } },
    }),
    prisma.friendship.findMany({
      where: {
        OR: [{ requesterId: userId }, { addresseeId: userId }],
        status: 'ACCEPTED',
      },
      include: {
        requester: { select: { id: true, name: true, profileImage: true } },
        addressee: { select: { id: true, name: true, profileImage: true } },
      },
    }),
  ])

  return NextResponse.json({ received, sent, friends })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { addresseeId } = await req.json()
  const requesterId = (session.user as any).id

  if (requesterId === addresseeId) {
    return NextResponse.json({ error: 'Cannot add yourself' }, { status: 400 })
  }

  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { requesterId, addresseeId },
        { requesterId: addresseeId, addresseeId: requesterId },
      ],
    },
  })
  if (existing) {
    return NextResponse.json({ error: 'Friend request already exists' }, { status: 400 })
  }

  const friendship = await prisma.friendship.create({
    data: { requesterId, addresseeId },
  })
  return NextResponse.json(friendship, { status: 201 })
}
