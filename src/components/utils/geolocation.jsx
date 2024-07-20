import { useEffect } from 'react'
import { useDataContext } from './fetchData';

function UserLocation() {
   const { setLocation } = useDataContext()

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(successWeather, failWeather)
      }
      else {
         setLocation('New York')
      }
   }, [])
   const successWeather = (position) => {
      setLocation(position.coords.latitude + ', ' +position.coords.longitude)
   }
   const failWeather = () => {
      setLocation('New York')
   }
   return (
      <div>

      </div>
   )
}
export default UserLocation