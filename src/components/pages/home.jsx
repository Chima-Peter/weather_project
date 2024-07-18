import { useEffect, useState } from "react"
import FetchData from "../utils/fetchData"
import ActiveCode from "../utils/activeCode"
import UserLocation from "../utils/geolocation"
import AltLocation from "../utils/altLocation"

function Home() {
   const [fetchData, setFetchData] = useState({})
   const [color, setColor] = useState('')
   const [active, setActive] = useState(false)

   useEffect( () => {
      async function getData() {
         let user = await UserLocation()
         if (!user) user = await AltLocation()
         user = user.loc
         const temp = await FetchData({location:{user}})
         setColor(ActiveCode({code:temp.current.condition.code}))
         setActive(true)
         setFetchData(temp)
      }
      getData()
   }, [])
  return (
    <main className={`${active ? color : ''} w-[100vw] h-[100vh]`}>
      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam magni labore explicabo sequi accusamus nobis corrupti in temporibus doloribus qui maxime asperiores rerum porro ullam, vel voluptates beatae ipsa sed?
      </p>
    </main>
  )
}


export default Home
