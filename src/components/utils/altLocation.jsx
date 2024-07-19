
async function AltLocation() {
   try {
      const response = await fetch('https://ipinfo.io/json');
      if (!response.ok) {
        throw new Error(`HTTP Error: Status ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.log('RETRYING TO FETCH ALT LOCATION');
      // console.error(error)
      // setTimeout(AltLocation(), 5000)
    }
}

export default AltLocation
