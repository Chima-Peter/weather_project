import MobileAirAquality from './mobileAir'
import MobileBody from './mobileBody'
import MobileForecast from './mobileForecast'
import MobileNav from './mobileNav'

function MobileHome() {
  return (
    <main className="flex flex-col py-3 px-6 gap-10">
      <MobileNav />
      <MobileBody />
      <MobileForecast />
      <MobileAirAquality />
    </main>
  )
}

export default MobileHome
