'use client'

const REELS = [
  { id: 1, title: 'Morning Hike Adventure', author: 'Alice Johnson', views: '1.2M', gradient: 'from-orange-400 to-pink-600' },
  { id: 2, title: 'Street Food Tour', author: 'Bob Smith', views: '890K', gradient: 'from-green-400 to-teal-600' },
  { id: 3, title: 'Sunset Timelapse', author: 'Carol Williams', views: '2.1M', gradient: 'from-purple-500 to-blue-600' },
  { id: 4, title: 'Dance Challenge', author: 'David Brown', views: '3.4M', gradient: 'from-red-400 to-orange-500' },
  { id: 5, title: 'Cooking Tutorial', author: 'Emma Davis', views: '560K', gradient: 'from-yellow-400 to-green-500' },
  { id: 6, title: 'City Vibes', author: 'Frank Miller', views: '1.8M', gradient: 'from-blue-500 to-indigo-600' },
  { id: 7, title: 'Nature Sounds', author: 'Alice Johnson', views: '750K', gradient: 'from-teal-400 to-cyan-600' },
  { id: 8, title: 'Morning Routine', author: 'Bob Smith', views: '445K', gradient: 'from-pink-400 to-red-500' },
]

export default function ReelsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reels</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#e7f3ff] text-[#1877f2] rounded-lg font-semibold text-sm hover:bg-[#dce8ff] transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Create reel
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-md"
            style={{ aspectRatio: '9/16' }}
          >
            <div className={`w-full h-full bg-gradient-to-b ${reel.gradient} flex items-center justify-center min-h-[200px]`}>
              <svg className="w-16 h-16 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-semibold text-xs leading-tight">{reel.title}</p>
              <p className="text-gray-300 text-xs mt-0.5">{reel.author}</p>
              <p className="text-gray-300 text-xs">{reel.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
