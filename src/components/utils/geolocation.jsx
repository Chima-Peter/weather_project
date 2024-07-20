// function UserLocation() {
//    if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//          console.log(position)
//          return({
//          latitude: position.coords.latitude,
//          longitude: position.coords.longitude
//          });
//       },
//       (error) => {
//          console.log(error)
//       }
//    );
//    } else {
//    setError('Geolocation is not supported by this browser.');
//    }
// }
// export default UserLocation