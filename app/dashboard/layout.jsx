import React from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'

function DashboardLayout({children}) {
  return (
    <div className='min-h-screen bg-center bg-cover'
    style={{backgroundImage: "url('/bg.jpg')"}}>
      <div className="absolute"></div>
        <div className='relative'>
          <Header/>
          <div className='mx-5 md:mx-20 lg:mx-36'>
            {children}
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default DashboardLayout