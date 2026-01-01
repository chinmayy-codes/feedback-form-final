"use client"

import { Monitor } from "lucide-react"

export function MobileBlockScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-48 h-48 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full opacity-20 animate-pulse" />
          <div className="relative flex items-center justify-center h-full">
            <Monitor className="w-24 h-24 text-slate-700" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">Desktop View Required</h1>
          <p className="text-slate-600 leading-relaxed">
            This website is optimized exclusively for desktop and laptop screens. Please switch to a larger device to
            access the feedback form.
          </p>
        </div>

        <div className="pt-4 text-sm text-slate-500">Minimum screen width: 1024px</div>
      </div>
    </div>
  )
}
