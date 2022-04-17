import axios from "axios";

export function authSpotify(username){

    const authURL = "http://192.168.4.40:5000/api/spotify"
    const storeTokenUrl = "http://192.168.4.40:5000/api/storeAuthToken"

    var token_response = undefined;
    if (username){
        token_response = axios.get(authURL, {
            headers:
              {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
              }
          });
    }

    return token_response.then((token) => {
        token['username'] = username;
        axios.post(
        storeTokenUrl, 
        token.data, {
        headers:
          {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          }
      });
    });

}