import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { useContext, useEffect, useRef } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useDataContext } from "../fetchData";
import { fetchContext } from "../../pages/home";

function DesktopNav() {
   const {fetchData, setLocation, setSearch, search, active} = useDataContext()
   const {deg, setDeg} = useContext(fetchContext)
   const inputRef = useRef()

   const searchChange  = () => {
      setSearch(event.target.value)
   }
   const handleSearch = async () => {
      event.preventDefault()
      if (search != '') {
         setLocation(search)
      }
      else {
         inputRef.current.focus()
      }
   }

   useEffect(() => {
         setSearch('')
      }, [fetchData])

   return (
   <nav className="z-20 flex justify-between  z-90 top-0">
      <div className="flex gap-8 items-center">
         <div className="flex gap-2 items-center">
            <FaLocationCrosshairs className="text-white w-4 h-4"/>
            <h1 className="font-medium md:text-xs lg:text-sm text-white">
               {fetchData.location.name}
            </h1>
         </div>
         <div className="flex gap-2 items-center">
            <MdLocationPin
                className="text-white w-4 h-4"/>
            <h1 className="font-medium md:text-xs lg:text-sm text-white">
               {fetchData.location.region}
            </h1>
         </div>
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
            <h1 className="font-medium md:text-xs lg:text-sm text-white">
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
   </nav>
  )
}

export default DesktopNav
