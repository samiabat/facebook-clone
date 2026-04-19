'use client'

import { useState } from 'react'

const EVENTS = [
  {
    id: 1,
    title: 'React Conf 2024',
    date: 'May 22–23, 2024',
    location: 'Las Vegas, NV',
    attendees: 4200,
    category: 'Technology',
    image: 'https://picsum.photos/seed/react_conf/200/200',
    going: false,
  },
  {
    id: 2,
    title: 'Summer Music Festival',
    date: 'June 15, 2024',
    location: 'Central Park, New York',
    attendees: 15000,
    category: 'Music',
    image: 'https://picsum.photos/seed/music_festival/200/200',
    going: false,
  },
  {
    id: 3,
    title: 'Local Farmers Market',
    date: 'Every Saturday',
    location: 'Downtown Plaza',
    attendees: 350,
    category: 'Community',
    image: 'https://picsum.photos/seed/farmers_market/200/200',
    going: true,
  },
  {
    id: 4,
    title: 'Marathon for Charity',
    date: 'July 4, 2024',
    location: 'City Marathon Route',
    attendees: 2100,
    category: 'Sports',
    image: 'https://picsum.photos/seed/marathon_run/200/200',
    going: false,
  },
  {
    id: 5,
    title: 'Photography Workshop',
    date: 'May 30, 2024',
    location: 'Art Studio, Seattle',
    attendees: 45,
    category: 'Education',
    image: 'https://picsum.photos/seed/photo_workshop/200/200',
    going: false,
  },
  {
    id: 6,
    title: 'Food & Wine Expo',
    date: 'August 10–12, 2024',
    location: 'Convention Center, SF',
    attendees: 8000,
    category: 'Food',
    image: 'https://picsum.photos/seed/food_wine/200/200',
    going: false,
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState(EVENTS)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'going' | 'discover'>('upcoming')

  const toggleGoing = (id: number) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, going: !e.going } : e)))
  }

  const displayed =
    activeTab === 'going' ? events.filter((e) => e.going) : events

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#e7f3ff] text-[#1877f2] rounded-lg font-semibold text-sm hover:bg-[#dce8ff] transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Create event
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {(['upcoming', 'going', 'discover'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-[#1877f2] text-[#1877f2]'
                : 'border-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events list */}
      {displayed.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-4xl mb-3">📅</p>
          <p className="font-semibold text-gray-800">No events yet</p>
          <p className="text-gray-500 text-sm mt-1">Events you&apos;re going to will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayed.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex">
              <div className="w-24 flex-shrink-0 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 min-w-0">
                <p className="text-xs text-[#1877f2] font-semibold uppercase tracking-wide">{event.date}</p>
                <p className="font-bold text-gray-900 mt-0.5">{event.title}</p>
                <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {event.location}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{event.attendees.toLocaleString()} people going</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleGoing(event.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      event.going
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-[#e7f3ff] text-[#1877f2] hover:bg-[#dce8ff]'
                    }`}
                  >
                    {event.going ? '✓ Going' : 'Going'}
                  </button>
                  <button className="px-4 py-1.5 bg-[#f0f2f5] text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Interested
                  </button>
                  <button className="px-4 py-1.5 bg-[#f0f2f5] text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
