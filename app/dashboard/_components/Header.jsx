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
    <div className='flex p-3 items-center justify-between bg-gray-50'>
      <img src="/logo.png" width={120} height={100} alt="logo" />
      <ul className='hidden md:flex gap-6'>
        <li>
          <a href="/dashboard" className={`
            text-black transition-all cursor-pointer inline-block
             hover:scale-105 hover:font-medium]
            ${path === '/dashboard' ? 'font-medium' : ''}
            `}>
            Home
          </a>
        </li>
        {/* <li className={` text-white hover:text-white hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard'&&'text-white font-bold'}
          `}>Dashboard</li> */}
        {/* <li className={`text-white hover:text-white hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/support'&&'text-white font-bold'}
          `}>Support</li> */}
        {/* <li className={`text-white hover:text-white hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/how'&&'text-white font-bold'}
          `}>How It Works?</li> */}
        {/* <li className={`text-white hover:text-white hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/about'&&'text-white font-bold'}
          `}>About Us</li> */}
      </ul>
      <UserButton />
    </div>
  )
}

export default Header