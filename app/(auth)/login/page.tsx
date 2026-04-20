'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import SocialBladeLogo from '@/components/SocialBladeLogo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    login(email, password)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SocialBladeLogo size={52} />
            <h1 className="text-[#1877f2] text-5xl font-bold tracking-tight">Social Blade</h1>
          </div>
          <p className="text-gray-600 text-xl mt-2">Connect with friends and the world around you.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1877f2] text-base"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1877f2] text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1877f2] text-white py-3 rounded-lg font-semibold text-lg hover:bg-[#166fe5] transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <hr />
            <div className="text-center">
              <Link
                href="/register"
                className="bg-[#42b72a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36a420] transition-colors inline-block"
              >
                Create new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
