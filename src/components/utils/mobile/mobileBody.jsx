import { useContext, useEffect, useState } from "react"
import { fetchContext } from "../../pages/home"
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoThermometer } from 'react-icons/io5';
import { GiWaterDrop, GiDustCloud, GiMolecule } from 'react-icons/gi';
import { MdAir } from 'react-icons/md';
import { WiRain } from 'react-icons/wi';
import { useDataContext } from "../fetchData";

function MobileBody() {
   const { deg, } = useContext(fetchContext)
   const {fetchData} = useDataContext()
   const [show, setShow] = useState(false)
   const [us, setUS] = useState({
      icon: '',
      index: '',
   })

   useEffect(() => {
   setShow(false)
   let temp = us
   let data = fetchData.current.air_quality
   let index = data['us-epa-index']
   if (index) {
      if (Number(index) == 1) {
         temp.desc = 'Good';
         temp.index = index
      } else if (Number(index) == 2) {
         temp.desc = 'Moderate';
         temp.index = index
      } else if (Number(index) == 3) {
         temp.desc = 'Unhealthy for Sensitive Groups';
         temp.index = index
      } else if (Number(index) == 4) {
         temp.desc = 'Unhealthy';
         temp.index = index
      } else if (Number(index) == 5) {
         temp.desc = 'Very Unhealthy';
         temp.index = index
      } else {
         temp.desc = 'Hazardous';
         temp.index = index
      }
      setUS(temp)
      setShow(true)
   }
   }, [])
  return (
   <section className="flex w-[100%] justify-between mt-8 text-white flex-wrap gap-14">
      <div className="flex flex-col gap-2 items-center justify-center w-[100%]">
         <div className="flex flex-col gap-3 items-center justify-center w-[100%]">
            <img src={fetchData.current.condition.icon} alt={fetchData.current.condition.text} className="w-[50%]" />
            <h2 className="text-xs font-semibold text-white capitalize">
               {fetchData.current.condition.text}
            </h2>
            {
               deg && <h2 className=" text-6xl font-semibold">
                  {fetchData.current.temp_c}&deg;C
               </h2>
            }
            {
               !deg && <h2 className=" text-6xl font-semibold">
                  {fetchData.current.temp_f}&deg;F
               </h2>
            }
         </div>
            <div className="flex justify-between w-[100%] gap-1 items-start mt-10">
               <div className="flex flex-col justify-center items-center gap-1">
                  <IoThermometer  className="text-white w-3 h-3"/>
                  {
                     deg && <p className="text-white font-semibold text-xs">
                        {fetchData.current.feelslike_c}&deg;C
                     </p>
                  }
                  {
                     !deg && <p className="text-white font-semibold text-xs">
                        {fetchData.current.feelslike_f}&deg;F
                     </p>
                  }
                  <p className="font-medium italic text-[9px] text-white">
                     FEELS LIKE
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <FaTemperatureHigh  className="text-white w-3 h-3"/>
                  {
                     deg && <p className="font-semibold text-xs text-white">
                        {fetchData.current.temp_c}&deg;C
                     </p>
                  }
                  {
                     !deg && <p className="font-semibold text-xs text-white">
                        {fetchData.current.temp_f}&deg;F
                     </p>
                  }
                  <p className="font-medium italic text-[9px] text-white">
                     TEMPERATURE
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <GiWaterDrop  className="text-white w-3 h-3"/>
                  <p className="font-semibold text-xs text-white">
                     {fetchData.current.humidity}
                  </p>
                  <p className="font-medium italic text-[9px] text-white">
                     HUMIDITY
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <MdAir  className="text-white w-3 h-3"/>
                  <p className="font-semibold text-xs text-white">
                     {fetchData.current.wind_mph} MPH
                  </p>
                  <p className="font-medium italic text-[9px] text-white">
                     WIND ({fetchData.current.wind_dir})
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <WiRain  className="text-white w-3 h-3"/>
                  <p className="font-semibold text-xs text-white">
                     {fetchData.current.precip_in}
                  </p>
                  <p className="font-medium italic text-[9px] text-white">
                     PRECIPTATION
                  </p>
               </div>
            </div>
      </div>
   </section>
  )
}

export default MobileBody
