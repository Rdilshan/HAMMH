'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';


export default function LoginPage() {
  const router = useRouter()
  const { id } = useParams()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userid, setuserid] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all the fields");
    }

    if (password == confirmPassword) {
      const baseUrl = `/api/doctor/verify/`;
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userid, password: password })
      });

      const data = await response.json();
      console.log(data)
      if (response.status === 200) {
        toast.success("Successfully created account");
        setTimeout(() => {
          router.push('/')
        }, 1000);
      } else {
        toast.error(data.msg);
        setTimeout(() => {
          router.push('/')
        }, 1000);
      }

    } else {
      toast.error("Password does not match");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const baseUrl = `/api/doctor/verify`;
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: id })
        });

        const data = await response.json();

        if (response.status === 202) {
          toast.success("You have already verified your account");
          setTimeout(() => {
            router.push('/')
          }, 1000);
        } else if (response.status === 200) {
          setEmail(data.data.email)
          setuserid(data.data.id);
        } else {
          toast.error(data.msg);
        }
      }
    };

    fetchData();
  }, [id]);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-left text-3xl font-extrabold text-gray-900">
            Create Your Account
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
                value={email}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Email address"
                readOnly
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="verify-password" className="text-gray-700">Confrim Password</label>
              <input
                id="verify-password"
                name="verify-password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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