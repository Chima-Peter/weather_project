import { FaLocationCrosshairs } from "react-icons/fa6";
import { fetchContext } from "../../pages/home";
import { useContext, useRef, useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import FetchData from "../fetchData";
import ActiveCode from "../activeCode";

function DesktopNav() {
   const {fetchData, setFetchData, active, setActive, mainRef} = useContext(fetchContext)
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
   <nav className="z-20 flex justify-between">
      {
         active && <>
            <div className="flex gap-2 items-center">
               <FaLocationCrosshairs className="text-white w-4 h-4"/>
               <h1 className="font-medium text-md tracking-wider text-white">
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
                     <CiSearch className="h-4 text-white w-4 cursor-pointer"/>
                  </button>
               </label>
            </form>
            <div className="flex gap-2 items-center">
               <FaGlobeAmericas className="text-white w-4 h-4"/>
               <h1 className="font-medium text-md tracking-wider text-white">
                  {fetchData.location.country}
               </h1>
            </div>
         </>
      }
   </nav>
  )
}

export default DesktopNav
