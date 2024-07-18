async function UserLocation() {
   let location

   const successCallback = (position) => {
      console.log(position);
      location = position
      return location
   };
   
   const errorCallback = (error) => {
      console.error(error)
   };
   
   if (navigator.geolocation) {
      const options = {
         enableHighAccuracy: true,
         timeout: 5000,
       };
       
      navigator.geolocation.watchPosition(
         successCallback,
         errorCallback,
         options
       );
   }
}
export default UserLocation