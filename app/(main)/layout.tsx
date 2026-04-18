import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import LeftSidebar from '@/components/layout/LeftSidebar'
import RightSidebar from '@/components/layout/RightSidebar'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Navbar user={session.user as any} />
      <div className="max-w-screen-xl mx-auto pt-14">
        <div className="flex gap-4 px-4">
          <LeftSidebar user={session.user as any} />
          <main className="flex-1 min-w-0 py-4">{children}</main>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
