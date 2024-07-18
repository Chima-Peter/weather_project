import Text from '../utils/text'
function ActiveCode({code}) {
   const weatherData = Text()
   let color
   Object.keys(weatherData).map(data => {
      if (weatherData[data].code == code)
         color = weatherData[data].color
   })
   console.log(color)
   return color
}

export default ActiveCode
