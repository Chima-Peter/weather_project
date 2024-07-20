import { motion } from 'framer-motion'
import { useDataContext } from './fetchData'

function Loading() {
   const { error } = useDataContext()
  return (
    <div className='w-[100%] min-h-[100vh] backdrop-blur-xl bg-[rgba(0,0,0,0.7)] fixed z-20 flex items-center justify-center'>
      <p className='top-0 absolute text-sm font-normal italic text-white'>
         {error}
      </p>
      <motion.div 
         className='w-10 h-10 rounded-full border-2 border-r-0 border-white'
         animate={{ rotate: 360 }}
         transition={{repeat:Infinity, duration: 0.3, delay: 0}}>
      </motion.div>
    </div>
  )
}

export default Loading
