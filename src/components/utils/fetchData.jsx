
async function FetchData() {
   try {
      let response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=0fd44594938846f489191613241504&q=Benin City&days=7&aqi=yes&alerts=yes')
      if (!response.ok) {
         throw new Error(`HTTPS Error: Status ${response.status}`)
      }
      const result = await response.json()
      console.log(result)
   }
   catch (error) {
      console.log(error)
      FetchData()
   }
}

export default FetchData
