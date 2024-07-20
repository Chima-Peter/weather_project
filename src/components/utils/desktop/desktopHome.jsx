import DesktopNav from './desktopnav'
import DesktopBody from './desktopBody'
import DesktopForecast from './desktopForecast'

function DesktopHome() {
  return (
    <main className="flex flex-col md:py-2 lg:px-20 md:px-10 md:gap-14 lg:gap-16">
      <DesktopNav />
      <DesktopBody />
      <DesktopForecast />
    </main>
  )
}

export default DesktopHome
