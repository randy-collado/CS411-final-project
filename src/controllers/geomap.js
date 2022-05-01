import axios from "axios";

 export function geomapping(location){

    Urled_location = Urdlencoded.location//suppose this change the location into url

    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${Urled_location}&key=${G_API_key}`
    //the url to access geocode api4
     var Pinpoint_response = Promise.reject("Malformed token");//is this cluaster just for handling unexpected result?
     if (location){
         token_response = axios.get(geocodeUrl, {
             headers://not sure what this does from line 11-14
               {
                 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
               }
           });
     }

     return Pinpoint_response.then(
         (response) => {//response should be the json file returned from api?
        var result = response.location.lat + response.location.lat//the result should be the latitude and the latitude
        console.log(result)
         }
     ).catch((err) => { console.log(err) });

 }
