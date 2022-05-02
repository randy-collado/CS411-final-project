import { Component } from "react";
import axios from "axios";
import { base_endpoint } from "../endpoints/endpoints";
import { Player } from "../controllers/spotifyContext";

export class SpotifyDisplay extends Component {

    constructor(){
      if (SpotifyDisplay._instance) {
        return SpotifyDisplay._instance
      }
      super();
      SpotifyDisplay._instance = this;
      this.state = {
        auth_token: 'BQCLIqDNZ2IlFr3YdnnGqvpo-Y_oyu-q3E-nSLR2J9ZrvSU419BFRW93euvtFIhV-5ZolhydFTEQ44-nxZwQloRmVptsz7qW782L1QkFIXadb1jrJ1jPQoOAUKoeYr37UdIZ1RmQz1_GdgxJ45gV',
        album: {
        images: [{ url: ""}]
        },
        name: "",
        artists: [{ name: ""}],
        duration_ms: 0
      };
  
      
  
      this.getCurrentSong= this.getCurrentSong.bind(this);
      this.tick = this.tick.bind(this);
    }
  
    componentDidMount(){
      if (!this.state.auth_token){
        this.getAuthToken();
      }
      this.getCurrentSong(this.state.auth_token);
      this.interval = setInterval(() => this.tick(), 5000);
    }
  
    componentWillUnmount() {
      // clear the interval to save resources
      clearInterval(this.interval);
    }
  
    getCurrentSong(auth_token){
      const endpoint = 'https://api.spotify.com/v1/search?';
      const params = new URLSearchParams({
          q: this.props.diary.song,
          type: 'track',
          market: 'ES',

      });
      const response = axios.get(endpoint + params.toString(), {
        headers: {
          'Authorization': 'Bearer ' + auth_token,
        }
      });
      response.then((data) => {
        console.log(this.props.diary.song.split('-'));
        for (const album of data.data.tracks.items){
            if (album.artists[0].name.toLowerCase() === (this.props.diary.song).split('-')[0].toLowerCase()){
                this.setState(album);
                console.log(this.state);
                break;
            }
        };
        this.setState({
          item: data.data.item,
          is_playing: data.data.is_playing,
          progress_ms: data.data.progress_ms,
        });
      });
  
    }
  
    tick(){
      if (this.state.auth_token){
        this.getCurrentSong(this.state.auth_token)
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
    
     return (<Player item={this.state}/>);
   }
    
  
  }

