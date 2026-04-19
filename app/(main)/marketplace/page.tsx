'use client'

import { useState } from 'react'

const CATEGORIES = ['All', 'Vehicles', 'Electronics', 'Garden & Outdoor', 'Family', 'Clothing', 'Entertainment', 'Hobbies']

const LISTINGS = [
  { id: 1, title: '2019 Honda Civic', price: '$18,500', location: 'San Francisco, CA', category: 'Vehicles', image: 'https://picsum.photos/seed/honda_civic/400/300' },
  { id: 2, title: 'iPhone 14 Pro Max', price: '$850', location: 'New York, NY', category: 'Electronics', image: 'https://picsum.photos/seed/iphone14/400/300' },
  { id: 3, title: 'Vintage Sofa', price: '$320', location: 'Austin, TX', category: 'Family', image: 'https://picsum.photos/seed/vintage_sofa/400/300' },
  { id: 4, title: 'Mountain Bike', price: '$450', location: 'Denver, CO', category: 'Hobbies', image: 'https://picsum.photos/seed/mountain_bike/400/300' },
  { id: 5, title: 'MacBook Pro 2022', price: '$1,200', location: 'Seattle, WA', category: 'Electronics', image: 'https://picsum.photos/seed/macbook_pro/400/300' },
  { id: 6, title: 'Garden Set', price: '$180', location: 'Portland, OR', category: 'Garden & Outdoor', image: 'https://picsum.photos/seed/garden_set/400/300' },
  { id: 7, title: 'Canon DSLR Camera', price: '$680', location: 'Chicago, IL', category: 'Electronics', image: 'https://picsum.photos/seed/canon_dslr/400/300' },
  { id: 8, title: 'Designer Handbag', price: '$280', location: 'Miami, FL', category: 'Clothing', image: 'https://picsum.photos/seed/handbag_designer/400/300' },
]

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = LISTINGS.filter(
    (l) =>
      (activeCategory === 'All' || l.category === activeCategory) &&
      (search === '' || l.title.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#e7f3ff] text-[#1877f2] rounded-lg font-semibold text-sm hover:bg-[#dce8ff] transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Create new listing
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center bg-[#f0f2f5] rounded-full px-4 py-2.5 gap-2 mb-4">
        <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Marketplace"
          className="bg-transparent flex-1 text-sm focus:outline-none text-gray-800"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-[#1877f2] text-white'
                : 'bg-[#e4e6eb] text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Today's picks */}
      <h2 className="font-bold text-gray-900 text-lg mb-3">Today&apos;s picks</h2>
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No listings found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="h-36 overflow-hidden">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5">
                <p className="font-bold text-gray-900 text-sm">{listing.price}</p>
                <p className="text-gray-700 text-xs mt-0.5 truncate">{listing.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">{listing.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
