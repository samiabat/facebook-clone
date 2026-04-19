'use client'

import { useState } from 'react'

const TABS = ['Home', 'Live', 'Gaming', 'Shows', 'Sports']

const VIDEOS = [
  { id: 1, title: 'Epic Drone Footage of Patagonia', channel: 'NatureVids', views: '2.1M views', duration: '12:34', image: 'https://picsum.photos/seed/patagonia_drone/400/225' },
  { id: 2, title: 'Best Street Food in Bangkok', channel: 'FoodWorld', views: '890K views', duration: '18:22', image: 'https://picsum.photos/seed/bangkok_food/400/225' },
  { id: 3, title: 'React 18 New Features Explained', channel: 'CodeWithMe', views: '450K views', duration: '25:10', image: 'https://picsum.photos/seed/react_code/400/225' },
  { id: 4, title: 'World Cup Highlights 2024', channel: 'SportsTV', views: '5.3M views', duration: '08:45', image: 'https://picsum.photos/seed/soccer_match/400/225' },
  { id: 5, title: 'Lofi Hip Hop Chill Mix', channel: 'ChillBeats', views: '1.8M views', duration: '1:02:00', image: 'https://picsum.photos/seed/lofi_music/400/225' },
  { id: 6, title: 'Morning Yoga Flow', channel: 'YogaLife', views: '670K views', duration: '30:00', image: 'https://picsum.photos/seed/yoga_morning/400/225' },
  { id: 7, title: 'Tiny House Tour 2024', channel: 'HomeTours', views: '1.2M views', duration: '14:08', image: 'https://picsum.photos/seed/tiny_house/400/225' },
  { id: 8, title: 'Aurora Borealis Timelapse', channel: 'NatureVids', views: '3.4M views', duration: '06:12', image: 'https://picsum.photos/seed/aurora_sky/400/225' },
]

export default function WatchPage() {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Watch</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#e7f3ff] text-[#1877f2] rounded-lg font-semibold text-sm hover:bg-[#dce8ff] transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          Go live
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-[#1877f2] text-white'
                : 'bg-[#e4e6eb] text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured (large) video */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-5 cursor-pointer hover:shadow-md transition-shadow">
        <div className="h-56 relative overflow-hidden">
          <img src="https://picsum.photos/seed/iss_live/800/400" alt="Live stream" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">3:42:00</div>
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">🔴 LIVE</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="font-bold text-gray-900">🔴 LIVE: Space Exploration Stream — ISS Live Feed</p>
          <p className="text-gray-500 text-sm mt-1">NASA Live · 128K watching now</p>
        </div>
      </div>

      {/* Videos grid */}
      <h2 className="font-bold text-gray-900 text-lg mb-3">Suggested videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VIDEOS.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="h-40 relative overflow-hidden group">
              <img src={video.image} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">{video.duration}</div>
            </div>
            <div className="p-3">
              <p className="font-semibold text-gray-900 text-sm leading-tight">{video.title}</p>
              <p className="text-gray-500 text-xs mt-1">{video.channel}</p>
              <p className="text-gray-400 text-xs">{video.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
