'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-[#1877f2] text-5xl font-bold">socialbook</h1>
          <p className="text-gray-600 text-xl mt-2">Connect with friends and the world around you.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
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
