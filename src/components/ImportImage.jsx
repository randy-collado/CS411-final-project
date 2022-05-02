import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import "tailwindcss/tailwind.css"
import { Header } from "./Header";
import { uploadDiary } from "../controllers/diary.js";


const submitDiary = (event) => {
    event.preventDefault();
    const username = sessionStorage.getItem("user");
    const diary_image = event.currentTarget.elements.image.files[0];
    const diary_text = event.currentTarget.elements.diary.value;
    const diary_location = event.currentTarget.elements.location.value;
    const diary_song_artist = event.currentTarget.elements.song_artist.value;
    const diary_song_name = event.currentTarget.elements.song_name.value;


    const response = uploadDiary(username, diary_image, diary_text, diary_location, diary_song_artist + '-' + diary_song_name);

    response.then((data) => {
        if (data.data.ecode === 0){
            window.location.replace('/home?user=' + username);
        } else {
            console.log(data);
        }
    });
    
};

export function ImportImage(props){
    function useQuery() {
        const { search } = useLocation();
      
        return useMemo(() => new URLSearchParams(search), [search]);
      }
    
      let query = useQuery();
      if (sessionStorage.getItem("user") && sessionStorage.getItem("user") == query.get("user")){
        return (
            <>
            <Header displayHome={true} displayLogout={true}/>
            <form method="post" onSubmit={submitDiary}>
            <div className="flex flex-col mb-4">
                <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                    Image:
                    <input type="file" name="image" multiple accept="image/*"/>
                </label>
            </div>
            
            <div className="flex flex-col mb-4">
                <label className="mb-2 uppercase font-bold text-bg border text-grey-darkest" >
                    Diary:
                    <textarea type="text" name="diary"/>
                </label>
            </div>

            <div className="flex flex-col mb-4">
                <label className="mb-2 uppercase font-bold text-bg text-grey-darkest" >
                    Location:
                    <input type="text" name="location" />
                </label>
            </div>

            <div className="flex flex-col mb-4">
                <label className="mb-2 uppercase font-bold text-bg text-grey-darkest" >
                    Song Artist:
                    <input type="text" name="song_artist" />
                </label>
            </div>

            <div className="flex flex-col mb-4">
                <label className="mb-2 uppercase font-bold text-bg text-grey-darkest" >
                    Song Name:
                    <input type="text" name="song_name" />
                </label>
            </div>

            <div className="flex flex-col mb-4">
                <label className="mb-2 uppercase font-bold text-bg text-grey-darkest" >
                    <input type="submit" name="submit" />
                </label>
            </div>
            </form>
            </>
        );
      } else {
          window.location.replace('/');
      }
}