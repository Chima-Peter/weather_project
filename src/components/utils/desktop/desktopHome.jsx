import React from 'react'
import DesktopNav from './desktopnav'
import DesktopBody from './desktopBody'

function DesktopHome() {
  return (
    <main className="flex flex-col md:py-2 lg:px-20 md:px-10 md:gap-14 lg:gap-20">
      <DesktopNav />
      <DesktopBody />
    </main>
  )
}

export default DesktopHome
