async function FetchData({retries=3, location}) {
   try {
      console.log(location['user'])
      let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fd44594938846f489191613241504&q=${location['user']}&days=7&aqi=yes&alerts=yes`)
      if (!response.ok) {
         throw new Error(`HTTPS Error: Status ${response.status}`)
      }
      const result = await response.json()
      console.log(result)
      return result
   }
   catch (error) {
      console.log(error)
      if (retries > 0) {
         setTimeout(FetchData(), 2000)
      }
      else {
         console.error(error)
      }
   }
}

export default FetchData
