async function FetchData({location}) {
   try {
      console.log(location)
      let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fd44594938846f489191613241504&q=${location['search']}&days=7&aqi=yes&alerts=yes`)
      if (!response.ok) {
         throw new Error(`HTTPS Error: Status ${response.status}`)
      }
      const result = await response.json()
      console.log(result)
      console.log(location)
      return result
   }
   catch (error) {
      console.log('RETRYING TO FETCH WEATHER DATA')
      // let loc = location
      // setTimeout(FetchData({location:loc}), 3000)
      console.error(error)
   }
}

export default FetchData
