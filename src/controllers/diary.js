import axios from "axios";
import { useEffect, useState } from "react";
import { resolvePath } from "react-router-dom";

let id_counter = 0

export function getDiaries(username){

    const backendURL = 'http://192.168.4.40:5000/api/getDiaries?user=';
    if (username) { 
    const response =  axios.get(backendURL + username, {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    });
    return response;
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
    }
    return Promise.reject();
}

function constructDiary(username, img, caption, location, song){

  const diary = { username: username, src: img, id: id_counter++, text: caption, song: song, location: location };  
  return diary;
}

export async function uploadDiary(username, img, caption, location, song){

  const base64_img = await file_to_b64(img);

  const diary = constructDiary(username, base64_img, caption, location, song);
  const response = await addDiary(diary);
  return response;

}

function file_to_b64(img){
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => { resolve(reader.result.toString()); }
    reader.onerror = err => reject(err);
    reader.readAsDataURL(img);
  });
  
}

export function addDiary(diary){
  const backendURL = 'http://192.168.4.40:5000/api/addDiaries'
  if (diary){
    const response = axios.post(backendURL, diary, {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    });
    return response.data;
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
  }
    return Promise.reject();
}