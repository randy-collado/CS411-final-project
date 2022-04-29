import axios from "axios";
export function authSpotify2(username){
    const redirect_url = "http://192.168.4.40:5000/api/nextAuth";
    window.location.replace('https://accounts.spotify.com/authorize?client_id=bb3385ed054c49a590cb82021959ae7d&response_type=code&show_dialog=true&redirect_uri=' + redirect_url + '&scope=user-read-private#user-read-email&state=HjabHu756F6fsF');
}
// export function authSpotify(username){

//     const authURL = "http://192.168.4.40:5000/api/spotify"
//     const storeTokenUrl = "http://192.168.4.40:5000/api/storeAuthToken"

//     var token_response = Promise.reject("Malformed token");
//     if (username){
//         token_response = axios.get(authURL, {
//             headers:
//               {
//                 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
//               }
//           });
//     }

//     return token_response.then((token) => {
//         token['username'] = username;
//         axios.post(
//         storeTokenUrl, 
//         token.data, {
//         headers:
//           {
//             'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
//           }
//       });
//     }).catch((err) => { console.log(err) });

// }