import { useContext, useEffect, useState } from "react"
import { fetchContext } from "../../pages/home"
import { FaTemperatureHigh } from 'react-icons/fa';
import { IoThermometer } from 'react-icons/io5';
import { GiWaterDrop, GiDustCloud, GiMolecule } from 'react-icons/gi';
import { MdAir } from 'react-icons/md';
import { WiRain } from 'react-icons/wi';

function DesktopBody() {
   const { fetchData, deg, active } = useContext(fetchContext)
   const [show, setShow] = useState(false)
   const [us, setUS] = useState({
      icon: '',
      index: '',
   })
   const [gp, setGP] = useState({
      icon: '',
      index: ''
   })

   useEffect(() => {
      if (active) {
      setShow(false)
      let temp = us
      let data = fetchData.current.air_quality
      console.log(data)
      let index = data['us-epa-index']

      if (index <= 50) {
         temp.desc = 'Good';
         temp.index = index
      } else if (index <= 100) {
         temp.desc = 'Moderate';
         temp.index = index
      } else if (index <= 150) {
         temp.desc = 'Unhealthy for Sensitive Groups';
         temp.index = index
      } else if (index <= 200) {
         temp.desc = 'Unhealthy';
         temp.index = index
      } else if (index <= 300) {
         temp.desc = 'Very Unhealthy';
         temp.index = index
      } else {
         temp.desc = 'Hazardous';
         temp.index = index
      }

      setUS(temp)

      
      temp = gp
      index = data['gp-defra-index']

         if (index <= 3) {
            temp.desc = 'Low';
         } else if (index <= 6) {

            temp.desc = 'Moderate';
         } else if (index <= 9) {

            temp.desc = 'High';
         } else {

            temp.desc = 'Very High';
         }
         temp.index = index
         setGP(temp)
         setShow(true)
      }
   }, [active])
  return (
   <section className="flex w-[100%] justify-between mt-10 text-white flex-wrap gap-14">
      <div className="flex items-start flex-col gap-2">
         <h2 className="text-sm font-bold text-white capitalize">
            {fetchData.current.condition.text}
         </h2>
         <div className="flex md:gap-8 lg:gap-10">
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
            <img src={fetchData.current.condition.icon} alt={fetchData.current.condition.text} />
         </div>
            <div className="flex gap-6 mt-10">
               <div className="flex flex-col justify-center items-center gap-1">
                  <IoThermometer  className="text-white w-6 h-6"/>
                  {
                     deg && <p className="text-white font-bold text-sm">
                        {fetchData.current.feelslike_c}&deg;C
                     </p>
                  }
                  {
                     !deg && <p className="text-white font-bold text-sm">
                        {fetchData.current.feelslike_f}&deg;F
                     </p>
                  }
                  <p className="font-medium italic text-[9px] text-white">
                     FEELS LIKE
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <FaTemperatureHigh  className="text-white w-6 h-6"/>
                  {
                     deg && <p className="font-semibold tem text-white">
                        {fetchData.current.temp_c}&deg;C
                     </p>
                  }
                  {
                     !deg && <p className="font-semibold tem text-white">
                        {fetchData.current.temp_f}&deg;F
                     </p>
                  }
                  <p className="font-medium italic text-[9px] text-white">
                     TEMPERATURE
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <GiWaterDrop  className="text-white w-6 h-6"/>
                  <p className="font-semibold tem text-white">
                     {fetchData.current.humidity}
                  </p>
                  <p className="font-medium italic text-[9px] text-white">
                     HUMIDITY
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <MdAir  className="text-white w-6 h-6"/>
                  <p className="font-semibold tem text-white">
                     {fetchData.current.wind_mph} MPH
                  </p>
                  <p className="font-medium italic text-[9px] text-white">
                     WIND ({fetchData.current.wind_dir})
                  </p>
               </div>
               <div className="flex flex-col justify-center items-center gap-1">
                  <WiRain  className="text-white w-6 h-6"/>
                  <p className="font-semibold tem text-white">
                     {fetchData.current.precip_in}
                  </p>
                  <p className="font-medium italic text-[9px] text-white">
                     PRECIPTATION
                  </p>
               </div>
            </div>
      </div>
      {
         show && <div className=" lg:translate-y-[-15%]">
            <div className="flex flex-col gap-3">
               <h3 className="text-md font-bold text-center text-white pb-2 capitalize w-[100%] border-b-2">
                  AIR QUALITY
               </h3>
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 border-b-2 pb-2">
                     <p className="font-medium italic text-[11px] text-white tracking-wider">
                        According to the US-GPA-INDEX, with a rating of {us.index}, the air quality for {fetchData.location.name} is {us.desc}.
                     </p>
                  </div>
                  <div className="flex items-center gap-4 border-b-2 pb-2">
                     <p className="font-medium italic text-[11px] text-white tracking-wider">
                        According to the GP-DEFRA-INDEX, with a rating of {gp.index}, the air quality for {fetchData.location.name} is {gp.desc}.
                     </p>
                  </div>
                  <h3 className="text-sm mt-5 font-bold text-center text-white pb-2 capitalize w-[100%] border-b-2">
                     AIR SPECIFICS
                  </h3>
                  <div className="flex justify-between">
                     <div className="flex flex-col justify-center items-center gap-1">
                        < MdAir  className="text-white w-6 h-6"/>
                        <p className="font-semibold tem text-white">
                           {fetchData.current.air_quality.pm2_5}
                        </p>
                        <p className="font-medium italic text-[9px] text-white">
                           PM 2.5
                        </p>
                     </div>
                     <div className="flex flex-col justify-center items-center gap-1">
                        < GiDustCloud  className="text-white w-6 h-6"/>
                        <p className="font-semibold tem text-white">
                           {fetchData.current.air_quality.pm10}
                        </p>
                        <p className="font-medium italic text-[9px] text-white">
                           PM 10
                        </p>
                     </div>
                     <div className="flex flex-col justify-center items-center gap-1">
                        < GiMolecule  className="text-white w-6 h-6"/>
                        <p className="font-semibold tem text-white">
                           {fetchData.current.air_quality.co}
                        </p>
                        <p className="font-medium italic text-[9px] text-white">
                           CO<sub>2</sub>
                        </p>
                     </div>
                     <div className="flex flex-col justify-center items-center gap-1">
                        < GiMolecule  className="text-white w-6 h-6"/>
                        <p className="font-semibold tem text-white">
                           {fetchData.current.air_quality.no2}
                        </p>
                        <p className="font-medium italic text-[9px] text-white">
                           NO<sub>2</sub>
                        </p>
                     </div>
                     <div className="flex flex-col justify-center items-center gap-1">
                        < GiMolecule  className="text-white w-6 h-6"/>
                        <p className="font-semibold tem text-white">
                           {fetchData.current.air_quality.o3}
                        </p>
                        <p className="font-medium italic text-[9px] text-white">
                           O<sub>3</sub>
                        </p>
                     </div>
                     <div className="flex flex-col justify-center items-center gap-1">
                        < GiMolecule  className="text-white w-6 h-6"/>
                        <p className="font-semibold tem text-white">
                           {fetchData.current.air_quality.so2}
                        </p>
                        <p className="font-medium italic text-[9px] text-white">
                           SO<sub>2</sub>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      }
   </section>
  )
}

export default DesktopBody
