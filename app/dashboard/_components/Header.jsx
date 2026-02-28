"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

  const path = usePathname();
  useEffect(() => {
    console.log(path)
  }, [])

  return (
    <div className='flex px-8 py-3 items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 sticky top-5 z-50 mx-5 rounded-full'>
      
      <img src="/logo.png" width={120} height={100} alt="logo" />
      
      {/* Increased gap from gap-10 to gap-14 for more spacing */}
      <ul className='hidden md:flex gap-14'>
        <li>
          <a href="/dashboard" className={`
            text-white transition-all cursor-pointer inline-block
             hover:scale-105 hover:font-medium
            ${path === '/dashboard' ? 'font-medium' : ''}
            `}>
            Home
          </a>
        </li>
        
        <li>
          <a href="/dashboard/features" className={`
            text-white transition-all cursor-pointer inline-block
             hover:scale-105 hover:font-medium
            ${path === '/dashboard/features' ? 'font-medium' : ''}
            `}>
            Features
          </a>
        </li>
        
        <li>
          <a href="/dashboard/about" className={`
            text-white transition-all cursor-pointer inline-block
             hover:scale-105 hover:font-medium
            ${path === '/dashboard/about' ? 'font-medium' : ''}
            `}>
            About us
          </a>
        </li>
      </ul>
      
      <UserButton />
    </div>
  )
}

export default Header