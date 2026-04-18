import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function RightSidebar() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const currentUserId = (session.user as any).id

  const users = await prisma.user.findMany({
    where: { id: { not: currentUserId } },
    take: 8,
    select: { id: true, name: true, profileImage: true },
  })

  return (
    <aside className="hidden xl:block w-72 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
      <h3 className="text-gray-500 font-semibold px-3 mb-3 text-sm">People you may know</h3>
      <div className="space-y-1">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gray-600">{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className="font-medium text-gray-800 text-sm">{user.name}</span>
          </Link>
        ))}
        {users.length === 0 && (
          <p className="px-3 text-sm text-gray-500">No suggestions yet.</p>
        )}
      </div>
    </aside>
  )
}
