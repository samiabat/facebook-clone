'use client'

const REELS = [
  { id: 1, title: 'Morning Hike Adventure', author: 'Alice Johnson', views: '1.2M', image: 'https://picsum.photos/seed/reel_hike/200/356' },
  { id: 2, title: 'Street Food Tour', author: 'Bob Smith', views: '890K', image: 'https://picsum.photos/seed/reel_food/200/356' },
  { id: 3, title: 'Sunset Timelapse', author: 'Carol Williams', views: '2.1M', image: 'https://picsum.photos/seed/reel_sunset/200/356' },
  { id: 4, title: 'Dance Challenge', author: 'David Brown', views: '3.4M', image: 'https://picsum.photos/seed/reel_dance/200/356' },
  { id: 5, title: 'Cooking Tutorial', author: 'Emma Davis', views: '560K', image: 'https://picsum.photos/seed/reel_cook/200/356' },
  { id: 6, title: 'City Vibes', author: 'Frank Miller', views: '1.8M', image: 'https://picsum.photos/seed/reel_city/200/356' },
  { id: 7, title: 'Nature Sounds', author: 'Alice Johnson', views: '750K', image: 'https://picsum.photos/seed/reel_nature/200/356' },
  { id: 8, title: 'Morning Routine', author: 'Bob Smith', views: '445K', image: 'https://picsum.photos/seed/reel_morning/200/356' },
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
            <img src={reel.image} alt={reel.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
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
