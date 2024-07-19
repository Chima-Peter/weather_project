import { useEffect, useState, useRef, createContext } from "react"
import FetchData from "../utils/fetchData"
import ActiveCode from "../utils/activeCode"
import UserLocation from "../utils/geolocation"
import AltLocation from "../utils/altLocation"
import DesktopHome from "../utils/desktop/desktopHome"
import MediaQuery from "react-responsive"

const fetchContext = createContext()

function Home() {
   const [fetchData, setFetchData] = useState({})
   const [active, setActive] = useState(false)
   const mainRef = useRef(null)

   useEffect( () => {
      setActive(false)
      async function getData() {
         if (mainRef.current) {   
            mainRef.current.style.backgroundColor = `lightblue`
         }
         let search = await UserLocation()
         let temp
         if (!search) {
            search = await AltLocation()
            search = search.loc
         } else {
            temp = search.coords.latitude + ',' + search.coords.longitude
            search = temp
         }
         const tempStorage = await FetchData({location:{search}})
         if (mainRef.current) {   
            mainRef.current.style.backgroundImage = `url(${ActiveCode({code:tempStorage.current.condition.code})})`;
            mainRef.current.style.backgroundSize = 'cover';
            mainRef.current.style.backgroundPosition = 'center';
         }
         setFetchData(tempStorage)
         setActive(true)
      }
      getData()
   }, [])

   // useEffect(() => {
   //    if (mainRef.current) {   
   //       const tempStorage = fetchData
   //       console.log(fetchData)
   //       mainRef.current.style.backgroundImage = `url(${ActiveCode({code:tempStorage.current.condition.code})})`;
   //       mainRef.current.style.backgroundSize = 'cover';
   //       mainRef.current.style.backgroundPosition = 'center';
   //    }
   // }, [fetchData])


  return (
   <fetchContext.Provider value={{fetchData, active, setActive, setFetchData, mainRef}} >
      <main 
         className={`w-[100%] min-h-[100vh] overflow-x-hidden`}
         ref={mainRef}
         >
         <div className="w-[100%] z-10 h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0">
         </div>
         {
            active && <MediaQuery minWidth={'768px'}>
               <DesktopHome />
            </MediaQuery>
         }
      </main>
   </fetchContext.Provider>
  )
}


export { Home, fetchContext }
