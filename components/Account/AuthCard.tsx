import React from 'react'
import Link from 'next/link'

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-secondary/20">
      <div className="w-full max-w-lg bg-main border border-gray-200 shadow-2xl rounded-2xl p-10">

        <div className="flex flex-col items-center mb-6">

          <Link href="/" className="flex flex-col items-center">
            <img
              src="/assets/images/logo.png"
              alt="GLOW Logo"
              className="h-36 w-auto mb-2"
            />
          </Link>

        </div>

        {children}
      </div>
    </div>
  )
}