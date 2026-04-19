'use client'

import { useState } from 'react'

const SAVED_CATEGORIES = [
  { id: 'all', label: 'All saved', icon: '🔖' },
  { id: 'posts', label: 'Posts', icon: '📝' },
  { id: 'videos', label: 'Videos', icon: '🎬' },
  { id: 'links', label: 'Links', icon: '🔗' },
  { id: 'places', label: 'Places', icon: '📍' },
]

const SAVED_ITEMS = [
  { id: 1, category: 'posts', title: 'Morning workout tips that actually work', author: 'Alice Johnson', date: '2 days ago', gradient: 'from-orange-400 to-red-500', emoji: '💪', type: 'Post' },
  { id: 2, category: 'videos', title: 'How to make perfect pasta at home', author: 'Carol Williams', date: '5 days ago', gradient: 'from-yellow-400 to-orange-500', emoji: '🍝', type: 'Video' },
  { id: 3, category: 'links', title: '10 Best React Hooks Explained', author: 'Tech Blog', date: '1 week ago', gradient: 'from-blue-400 to-indigo-600', emoji: '⚛️', type: 'Link' },
  { id: 4, category: 'places', title: 'The Golden Gate Viewpoint', author: 'Travel Guide', date: '2 weeks ago', gradient: 'from-green-400 to-teal-500', emoji: '🌉', type: 'Place' },
  { id: 5, category: 'posts', title: 'Photography tips for beginners', author: 'Bob Smith', date: '3 weeks ago', gradient: 'from-purple-400 to-pink-500', emoji: '📷', type: 'Post' },
  { id: 6, category: 'videos', title: 'City street art documentary', author: 'Frank Miller', date: '1 month ago', gradient: 'from-gray-500 to-gray-700', emoji: '🎨', type: 'Video' },
]

export default function SavedPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all' ? SAVED_ITEMS : SAVED_ITEMS.filter((i) => i.category === activeCategory)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
        <button className="text-[#1877f2] text-sm font-semibold hover:underline">Manage saved items</button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {SAVED_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === cat.id
                ? 'bg-[#1877f2] text-white'
                : 'bg-[#e4e6eb] text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Saved items grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-4xl mb-3">🔖</p>
          <p className="font-semibold text-gray-800">Nothing saved yet</p>
          <p className="text-gray-500 text-sm mt-1">Items you save will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className={`h-32 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <span className="text-4xl">{item.emoji}</span>
              </div>
              <div className="p-3">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.type}</span>
                <p className="font-semibold text-gray-900 text-sm mt-0.5 leading-tight">{item.title}</p>
                <p className="text-gray-500 text-xs mt-1">{item.author} · {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
