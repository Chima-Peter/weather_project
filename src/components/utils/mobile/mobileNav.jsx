import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion'
import { useDataContext } from "../fetchData";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdCancelPresentation  } from "react-icons/md";

function MobileNav() {
   const {fetchData, setLocation, setSearch, search} = useDataContext()
   const inputRef = useRef()
   const [drop, setDrop] = useState(false)
   const [open, setOpen] = useState(false)

   const searchChange  = () => {
      setSearch(event.target.value)
   }

   const handleDrop = () => {
      setDrop(!drop)
   }

   const handleOpen = () => {
      setOpen(!open)
   }

   const handleSearch = async () => {
      event.preventDefault()
      if (search != '') {
         setOpen(false)
         setLocation(search)
      }
      else {
         inputRef.current.focus()
      }
   }

   useEffect(() => {
         setSearch('')
   }, [fetchData])

   const dropVariants = {
      initial: {
         opacity: 0
      },
      final: {
         opacity: 1
      },
   }

   return (
      <nav className="flex flex-col gap-2 z-20 top-0">
         <div className="flex justify-between items-center">
            <div className="flex flex-col gap-8 items-center">
               <div className="flex gap-3 items-center px-1">
                  <MdLocationPin className="text-white w-5 h-5"/>
                  <h1 className="font-medium text-md text-white">
                     {fetchData.location.name}
                  </h1>
                  {
                     !drop && <MdOutlineArrowDropDown className="text-white w-7 h-7" onClick={handleDrop}/>
                  }
                  {
                     drop && <MdOutlineArrowDropUp className="text-white w-7 h-7" onClick={handleDrop}/>
                  }
               </div>
            </div>
            <button type="submit" onClick={handleOpen}>
               <FaSearch className="h-6 text-white w-6 cursor-pointer"/>
            </button>
         </div>
         {
            drop && <motion.div 
               className="flex flex-col text-white items-start"
               variants={dropVariants}
               initial='initial'
               animate='final'>
               <div className="flex gap-3 items-center py-2 px-1">
                  <FaLocationCrosshairs
                     className=" w-5 h-5"/>
                  <h1 className="font-medium text-md ">
                     {fetchData.location.region}
                  </h1>
               </div>
               <div className="flex gap-3 items-center py-2 px-1">
                  <FaGlobeAmericas className=" w-5 h-5"/>
                  <h1 className="font-medium text-md">
                     {fetchData.location.country}
                  </h1>
               </div>
            </motion.div>
         }
         {
            open && <form 
               className="w-[100vw] min-h-[100vh] backdrop-blur-md z-30 absolute top-0 left-0 pt-3"
               noValidate onSubmit={handleSearch}>
               <motion.button 
                  type="button" 
                  initial={{y: '20px', opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{duration: 1}}
                  className="mb-4 px-3">
                  <MdCancelPresentation className="text-white w-6 h-6" onClick={handleOpen}/>
               </motion.button>
               <motion.label 
                  htmlFor="search" 
                  initial={{y: '20px', opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{duration: 1}}
                  className="border-b-2 border-b-white w-[80%] px-2 mx-auto flex justify-between text-white">
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
                     className="bg-inherit text-center pb-2 w-[85%] placeholder:text-sm placeholder:text-white placeholder:font-semibold placeholder:normal-case capitalize focus:outline-none font-semibold text-white text-sm w-100 border-0" />
                  <button type="submit">
                     <FaSearch className="h-5 text-white w-5 cursor-pointer"/>
                  </button>
               </motion.label>
            </form>
         }
      </nav>
  )
}

export default MobileNav
