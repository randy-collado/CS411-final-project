import axios from 'axios';
import { base_endpoint } from '../endpoints/endpoints.js';

export function createUser(username, password, email) {
  /** Here you need to validate user input. 
   Let's say only Name and email are required field
 */
  const backendURL = base_endpoint + '/api/register';
  if (username && email && password) { 

    return axios.post(backendURL, {
      username: username, 
      password: password, 
      email: email,
    }, {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    });
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
  }
}

export function deleteUser(req, res, next){

}

export function loginUser(username, password){
  const backendURL = base_endpoint + '/api/login';
  if (username && password) { 

    return axios.post(backendURL, {
      username: username, 
      password: password, 
    }, {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    });
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
  }
}

export function updateUserPassword(){

}

