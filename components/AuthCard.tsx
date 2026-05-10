import React from 'react'

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-secondary/60">
      <div className="w-full max-w-lg bg-primary border border-gray-200 shadow-2xl rounded-2xl p-10">
        <h1 className="mb-8 text-4xl text-center tracking-widest text-white font-medium uppercase">
          Urban Innovation
        </h1>
        {children}
      </div>
    </div>
  )
}