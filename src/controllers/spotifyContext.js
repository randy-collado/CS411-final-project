import axios from "axios";
import { Component } from "react";
import "../components/styles/Player.css";
import { base_endpoint } from "../endpoints/endpoints.js";

const CLIENT_SECRET = 'b573c369cfc44cccb68a22a5e90808ab';
const CLIENT_ID = 'bb3385ed054c49a590cb82021959ae7d';

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

export function authSpotify2(username){
    const redirect_url = base_endpoint + "/api/nextAuth";
    window.location.replace('https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID + '&response_type=code&show_dialog=true&redirect_uri=' + redirect_url + '&scope=' + scopes.join("#") +'&state=HjabHu756F6fsF');
}

export const Player = (props) => {
  const backgroundStyles = {
    backgroundImage:`url(${props.item.album.images[0].url})`,
  };
  
  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };
  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {props.is_playing}
          </div>
          <div className="progress">
            <div
              className="progress__bar"
              style={progressBarStyles}
            />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
}

/*
This handler was inspired (mostly copied) from https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
*/
export class SpotifyPlayer extends Component {

  constructor(){
    if (SpotifyPlayer._instance) {
      return SpotifyPlayer._instance
    }
    super();
    SpotifyPlayer._instance = this;
    this.state = {
      auth_token: 'BQCLIqDNZ2IlFr3YdnnGqvpo-Y_oyu-q3E-nSLR2J9ZrvSU419BFRW93euvtFIhV-5ZolhydFTEQ44-nxZwQloRmVptsz7qW782L1QkFIXadb1jrJ1jPQoOAUKoeYr37UdIZ1RmQz1_GdgxJ45gV',
      item: {
        album: {
          images: [{ url: ""}]
        },
        name: "",
        artists: [{ name: ""}],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };

    

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount(){
    if (!this.state.auth_token){
      this.getAuthToken();
    }
    this.getCurrentlyPlaying(this.state.auth_token);
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  getCurrentlyPlaying(auth_token){
    console.log(auth_token)
    const response = axios.get("https://api.spotify.com/v1/me/player/currently-playing?market=ES", {
      headers: {
        'Authorization': 'Bearer ' + auth_token,
      }
    });
    console.log(response);
    response.then((data) => {
      this.setState({
        item: data.data.item,
        is_playing: data.data.is_playing,
        progress_ms: data.data.progress_ms,
      });
    });

  }

  tick(){
    if (this.state.auth_token){
      this.getCurrentlyPlaying(this.state.auth_token)
    }
  }

   getAuthToken(){
    const url = base_endpoint + "/api/getToken";
    const response = axios.get(url);
   
    response.then((data) => {
      this.setState({
        auth_token: data.data.access_token
      });
    });
 }

 render(){
   return (<Player item={this.state.item} 
                   is_playing={this.state.is_playing} 
                   progress_ms={this.state.progress_ms}/>);
 }
  

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