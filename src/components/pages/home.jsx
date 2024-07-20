import { useState, useRef, createContext } from "react"
import ActiveCode from "../utils/activeCode"
import { useDataContext } from "../utils/fetchData"
import DesktopHome from "../utils/desktop/desktopHome"
import MediaQuery from "react-responsive"
import Loading from "../utils/loading"

const fetchContext = createContext()

function Home() {
   const mainRef = useRef(null)
   const [deg, setDeg] = useState(false)
   const {fetchData, active} = useDataContext()

   if (active) {
      let temp = fetchData
      mainRef.current.style.backgroundImage = `url(${ActiveCode({code:temp.current.condition.code})})`;
      mainRef.current.style.backgroundSize = 'cover';
      mainRef.current.style.backgroundPosition = 'center';
   }



  return (
   <fetchContext.Provider value={{mainRef, deg, setDeg}} >
      <main 
         className={`w-[100%] min-h-[100vh] overflow-x-hidden`}
         ref={mainRef}
         >
      {
         active && <div className="w-[100%] md:pb-10 z-10 min-h-[100vh] bg-[rgba(0,0,0,0.5)] top-0">
            <MediaQuery minWidth={'768px'}>
               <DesktopHome />
            </MediaQuery>
         </div>
      }
      {
         !active && <Loading />
      }
      </main>
   </fetchContext.Provider>
  )
}


export { Home, fetchContext }
