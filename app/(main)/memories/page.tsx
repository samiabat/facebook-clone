'use client'

const MEMORIES = [
  {
    year: 2023,
    items: [
      { id: 1, date: 'March 15, 2023', content: 'Just finished my morning run! 🏃‍♀️ 5K in under 25 minutes – new personal best!', image: 'https://picsum.photos/seed/memory_run2023/800/350' },
      { id: 2, date: 'March 20, 2023', content: 'Captured this amazing sunset last night at the beach 🌅 Sometimes you just have to stop and appreciate the beauty around us.', image: 'https://picsum.photos/seed/memory_sunset2023/800/350' },
    ],
  },
  {
    year: 2022,
    items: [
      { id: 3, date: 'June 5, 2022', content: 'Had the most amazing coffee this morning at the new café downtown ☕', image: 'https://picsum.photos/seed/memory_coffee2022/800/350' },
      { id: 4, date: 'December 25, 2022', content: 'Merry Christmas everyone! 🎄 Spent the day with family and friends. So grateful!', image: 'https://picsum.photos/seed/memory_xmas2022/800/350' },
    ],
  },
]

export default function MemoriesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Memories</h1>
            <p className="text-gray-500 text-sm">We care about the memories you share here.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-[#e7f3ff] text-[#1877f2] rounded-lg font-semibold text-sm hover:bg-[#dce8ff] transition-colors">
            On this day
          </button>
          <button className="flex-1 py-2 bg-[#f0f2f5] text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
            Recaps
          </button>
        </div>
      </div>

      {/* Memories by year */}
      {MEMORIES.map(({ year, items }) => (
        <div key={year} className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#e4e6eb] flex items-center justify-center text-sm">📅</span>
            {year}
          </h2>
          <div className="space-y-4">
            {items.map((memory) => (
              <div key={memory.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-32 relative overflow-hidden">
                  <img src={memory.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                    <p className="text-white font-semibold text-center text-sm leading-relaxed drop-shadow">{memory.content}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{memory.date}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">You have a memory from {year}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#e7f3ff] text-[#1877f2] rounded-lg text-xs font-semibold hover:bg-[#dce8ff] transition-colors">
                      Share
                    </button>
                    <button className="px-3 py-1.5 bg-[#f0f2f5] text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors">
                      Hide
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
