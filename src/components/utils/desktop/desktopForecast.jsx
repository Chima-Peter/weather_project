import { useContext, useEffect, useState } from 'react'
import { useDataContext } from '../fetchData'
import { fetchContext } from '../../pages/home'

function DesktopForecast() {
   const [dates, setDates] = useState(
      {
         today: '',
         tomorrow: '',
         next: ''
      })
   const [activeBtn, setActiveBtn] = useState(
      {
         val1: true,
         val2: false,
         val3: false
      }
   )
   const { deg } = useContext(fetchContext)
   const [show, setShow] = useState(false)
   const { fetchData } = useDataContext()
   const [today, setToday] = useState({})
   const [tomorrow, setTomorrow] = useState({})
   const [next, setNext] = useState({})
   const [time, setTime] = useState([])

   const handleBtns = (val) => {
      const newData = {}
      newData[val] = true
      setActiveBtn(newData)
   }

   useEffect(() => {
      let today = new Date()
      let temp = dates
      temp.today = today.toDateString()
      let tomorrow = today.setDate(today.getDate() + 1)
      tomorrow = new Date(tomorrow)
      temp.tomorrow = tomorrow.toDateString()
      let next = tomorrow.setDate(tomorrow.getDate() + 1)
      next = new Date(next)
      temp.next = next.toDateString()
      setDates(temp)
      setShow(true)

      let tempData = fetchData
      setToday(tempData.forecast.forecastday[0].hour)
      setTomorrow(tempData.forecast.forecastday[1].hour)
      setNext(tempData.forecast.forecastday[2].hour)

      let newData = []
      for (let index = 0; index < 24; index++) {
         if (index < 9)
            newData[index] = '0' + index
         else
            newData[index]  = index
      }
      setTime(newData)
   }, [])

  return (
   <div className=''>
      {
         show && <div className='flex gap-6'>
            <button className={`${activeBtn.val1 ? 'border-b-2 border-white' : ''} text-xs text-white pb-2 font-semibold`} type="button" onClick={() => handleBtns('val1')}>
               {dates.today}
            </button>
            <button className={`${activeBtn.val2 ? 'border-b-2 border-white' : ''} text-xs text-white pb-2 font-semibold`} type="button" onClick={() => handleBtns('val2')}>
               {dates.tomorrow}
            </button>
            <button className={`${activeBtn.val3 ? 'border-b-2 border-white' : ''} text-xs text-white pb-2 font-semibold`} type="button" onClick={() => handleBtns('val3')}>
               {dates.next}
            </button>
         </div>
      }
      <div className='mt-4'>
         {
            activeBtn.val1 && <div className='flex gap-2 overflow-x-auto customScroll'>
               {
                  Object.keys(today).map((data, index) => (
                     <div className='py-1 px-4 border-2 items-center flex flex-col rounded-md' key={data}>
                        <p className='text-xs text-white italic font-semibold'>
                           {time[index]}:00
                        </p>
                        <img src={today[data].condition.icon} alt="" />
                        {
                           deg && <h4 className="font-medium  text-md text-white">
                              {fetchData.current.temp_c}&deg;C
                           </h4>
                        }
                        {
                           !deg && <h4 className="font-medium  text-md text-white">
                              {fetchData.current.temp_f}&deg;F
                           </h4>
                        }
                     </div>
                  ))
               }
            </div>
         }
         {
            activeBtn.val2 && <div className='flex gap-2 overflow-x-auto customScroll'>
               {
                  Object.keys(tomorrow).map((data, index) => (
                     <div className='py-1 px-4 border-2 items-center flex flex-col rounded-md'key={data}>
                        <p className='text-xs text-white italic font-semibold'>
                           {time[index]}:00
                        </p>
                        <img src={tomorrow[data].condition.icon} alt="" />
                        {
                           deg && <h4 className="font-medium  text-md text-white">
                              {fetchData.current.temp_c}&deg;C
                           </h4>
                        }
                        {
                           !deg && <h4 className="font-medium  text-md text-white">
                              {fetchData.current.temp_f}&deg;F
                           </h4>
                        }
                     </div>
                  ))
               }
            </div>
         }
         {
            activeBtn.val3 && <div className='flex gap-2 overflow-x-auto customScroll'>
               {
                  Object.keys(next).map((data, index) => (
                     <div className='py-1 px-4 border-2 items-center flex flex-col rounded-md' key={data}>
                        <p className='text-xs text-white italic font-semibold'>
                           {time[index]}:00
                        </p>
                        <img src={next[data].condition.icon} alt="" />
                        {
                           deg && <h4 className="font-medium  text-md text-white">
                              {fetchData.current.temp_c}&deg;C
                           </h4>
                        }
                        {
                           !deg && <h4 className="font-medium  text-md text-white">
                              {fetchData.current.temp_f}&deg;F
                           </h4>
                        }
                     </div>
                  ))
               }
            </div>
         }
      </div>
   </div>
  )
}

export default DesktopForecast
