'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getJobs, getAppliedJobs, applyToJob } from '@/lib/localStore'
import { SeedJob } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'

const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract']

export default function JobsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<SeedJob[]>([])
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [activeType, setActiveType] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setJobs(getJobs())
    if (user) {
      setAppliedJobs(getAppliedJobs(user.id))
    }
  }, [user])

  const handleApply = (jobId: string) => {
    if (!user || appliedJobs.includes(jobId)) return
    applyToJob(user.id, jobId)
    setAppliedJobs((prev) => [...prev, jobId])
  }

  const filtered = jobs.filter(
    (j) =>
      (activeType === 'All' || j.type === activeType) &&
      (search === '' ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          Facebook Jobs · powered by Meta
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 gap-2 shadow-sm">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title or company..."
            className="flex-1 text-sm focus:outline-none text-gray-800 bg-transparent"
          />
        </div>
      </div>

      {/* Type filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {JOB_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeType === type
                ? 'bg-[#1877f2] text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Jobs count */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} job{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Job listings */}
      <div className="space-y-3">
        {filtered.map((job) => {
          const hasApplied = appliedJobs.includes(job.id)
          return (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Company logo placeholder */}
                <div className="w-14 h-14 rounded-xl bg-[#e7f3ff] flex items-center justify-center flex-shrink-0 text-2xl font-bold text-[#1877f2] border border-gray-200">
                  {job.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-base leading-tight">{job.title}</h2>
                  <p className="text-[#1877f2] font-semibold text-sm mt-0.5">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 3 16.5 1.5 14.5 1.5h-5C7.5 1.5 6 3 6 4.64c0 .48.11.92.18 1.36H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5.5-3c1.03 0 1.5.5 1.5 1.5S15.53 6 14.5 6h-5C8.47 6 8 5.5 8 4.5S8.47 3 9.5 3h5zM20 19H4V8h16v11z" />
                      </svg>
                      {job.type}
                    </span>
                    <span className="font-semibold text-gray-700">{job.salary}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Posted {formatDate(job.postedAt)}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-2">{job.description}</p>

              <div className="mt-3">
                <div className="flex flex-wrap gap-1.5">
                  {job.requirements.slice(0, 3).map((req, i) => (
                    <span key={i} className="bg-[#f0f2f5] text-gray-700 text-xs px-2.5 py-1 rounded-full">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="bg-[#f0f2f5] text-gray-500 text-xs px-2.5 py-1 rounded-full">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={hasApplied}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    hasApplied
                      ? 'bg-green-50 text-green-700 cursor-default border border-green-200'
                      : 'bg-[#1877f2] text-white hover:bg-[#166fe5]'
                  }`}
                >
                  {hasApplied ? '✓ Applied' : 'Apply now'}
                </button>
                <button className="px-4 py-2 bg-[#f0f2f5] text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Save
                </button>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-4xl mb-3">💼</p>
            <p className="font-semibold text-gray-800">No jobs found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
