'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getJobs, getAppliedJobs, applyToJob } from '@/lib/localStore'
import { SeedJob } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'

export default function JobsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<SeedJob[]>([])
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])

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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Opportunities</h1>
      <div className="space-y-4">
        {jobs.map((job) => {
          const hasApplied = appliedJobs.includes(job.id)
          return (
            <div key={job.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                  <p className="text-[#1877f2] font-semibold mt-0.5">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {formatDate(job.postedAt)}
                </span>
              </div>

              <p className="text-gray-700 mt-4 leading-relaxed">{job.description}</p>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h3>
                <ul className="space-y-1">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-[#1877f2] mt-0.5 flex-shrink-0">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={hasApplied}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    hasApplied
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-[#1877f2] text-white hover:bg-[#166fe5]'
                  }`}
                >
                  {hasApplied ? '✓ Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
