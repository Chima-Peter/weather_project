import { FaLocationCrosshairs } from "react-icons/fa6";
import { fetchContext } from "../../pages/home";
import { useContext, useRef, useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import FetchData from "../fetchData";
import ActiveCode from "../activeCode";

function DesktopNav() {
   const {fetchData, setFetchData, active, setActive, mainRef, setDeg, deg} = useContext(fetchContext)
   const [search, setSearch] = useState('')
   const inputRef = useRef()

   const searchChange  = () => {
      setSearch(event.target.value)
   }
   const handleSearch = async () => {
      event.preventDefault()
      if (search != '') {
         setActive(false)
         let temp = await FetchData({location:{search}})
         setFetchData(temp)
         setSearch('')
         setActive(true)
         if (mainRef.current) {   
            mainRef.current.style.backgroundImage = `url(${ActiveCode({code:temp.current.condition.code})})`;
            mainRef.current.style.backgroundSize = 'cover';
            mainRef.current.style.backgroundPosition = 'center';
         }
      }
      else {
         inputRef.current.focus()
      }
   }
   return (
   <nav className="z-20 flex justify-between  z-90 top-0">
      {
         active && <>
            <div className="flex gap-2 items-center">
               <FaLocationCrosshairs className="text-white w-4 h-4"/>
               <h1 className="font-medium text-sm text-white">
                  {fetchData.location.name}
               </h1>
            </div>
            <form noValidate onSubmit={handleSearch} className="">
               <label htmlFor="search" className="border-b-2 border-b-white flex text-white">
                  <input 
                     ref={inputRef}
                     type="text" 
                     name="search" 
                     id="search" 
                     autoFocus 
                     value={search}
                     autoComplete="off"
                     placeholder="Search your city name...."
                     onChange={searchChange}
                     className="bg-inherit text-center pb-2 placeholder:text-xs placeholder:text-white placeholder:font-semibold placeholder:normal-case capitalize focus:outline-none font-semibold text-white text-sm w-100 border-0" />
                  <button type="submit">
                     <FaSearch className="h-5 text-white w-5 cursor-pointer"/>
                  </button>
               </label>
            </form>
            <div className="flex gap-8 items-center">
               <div className="flex gap-2 items-center">
                  <FaGlobeAmericas className="text-white w-4 h-4"/>
                  <h1 className="font-medium text-sm text-white">
                     {fetchData.location.country}
                  </h1>
               </div>
               {
                  deg && <h1 className="text-sm font-bold text-white cursor-pointer" onClick={() => setDeg(!deg)}>
                     &deg;C
                  </h1>
               }
               {
                  !deg && <h1 className="text-sm font-bold text-white cursor-pointer" onClick={() => setDeg(!deg)}>
                     &deg;F
                  </h1>
               }
            </div>
            
         </>
      }
   </nav>
  )
}

export default DesktopNav
