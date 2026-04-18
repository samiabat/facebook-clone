import Link from 'next/link'

interface LeftSidebarProps {
  user: { id?: string; name?: string | null; profileImage?: string | null }
}

export default function LeftSidebar({ user }: LeftSidebarProps) {
  return (
    <aside className="hidden lg:block w-72 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
      <div className="space-y-1">
        <Link
          href={`/profile/${user.id}`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center flex-shrink-0">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name ?? ''} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-gray-600">{user.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <span className="font-medium text-gray-800">{user.name}</span>
        </Link>

        <Link href="/friends" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <span className="text-xl w-9 h-9 flex items-center justify-center">👥</span>
          <span className="font-medium text-gray-800">Friends</span>
        </Link>

        <Link href="/jobs" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <span className="text-xl w-9 h-9 flex items-center justify-center">💼</span>
          <span className="font-medium text-gray-800">Jobs</span>
        </Link>

        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <span className="text-xl w-9 h-9 flex items-center justify-center">📰</span>
          <span className="font-medium text-gray-800">News Feed</span>
        </Link>
      </div>
      <hr className="my-4" />
      <p className="px-3 text-xs text-gray-400">© 2024 SocialBook</p>
    </aside>
  )
}
