'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@/types/types'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState<User>({ email: '', password: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const baseUrl = `/api/Auth`;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password
      })
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("authToken", `Bearer ${data.token}`);
      router.push('/dashboard')
    } else {
      console.log("show the error msg..")
    }

    // if (user.email && user.password) {
    //   router.push('/dashboard')
    // }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-left text-3xl font-extrabold text-gray-900">
            Login to Your account
          </h1>

        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}