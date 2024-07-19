async function UserLocation() {
   let location

   const successCallback = async (position) => {
      location = await position
      return location
   };
   
   const errorCallback = (error) => {
      // console.log('RETRYING')
      // setTimeout(UserLocation(), 5000)
   };
   
   if (navigator.geolocation) {
      const options = {
         enableHighAccuracy: true,
       };
       
      navigator.geolocation.watchPosition(
         successCallback,
         errorCallback,
         options
       );
   }
}
export default UserLocation