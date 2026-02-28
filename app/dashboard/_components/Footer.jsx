import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-auto relative z-10 text-center">
      <p className="text-gray-500 text-sm font-medium">
        &copy; {currentYear} MockIt. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer