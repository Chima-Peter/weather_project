import Text from '../utils/text'
function ActiveCode({code}) {
   const weatherData = Text()
   let color
   Object.keys(weatherData).map(data => {
      if (weatherData[data].code == code) {
         color = weatherData[data].desktop
      }
   })
   return color
}

export default ActiveCode
