import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import "tailwindcss/tailwind.css"
import { Header } from "./Header";


const func = () => {console.log('lol')};

export function ImportImage(props){
    function useQuery() {
        const { search } = useLocation();
      
        return useMemo(() => new URLSearchParams(search), [search]);
      }
    
      let query = useQuery();
      console.log("hello");
      if (sessionStorage.getItem("user") && sessionStorage.getItem("user") == query.get("user")){
        return (
            <>
            <Header displayHome={true} displayLogout={true}/>
            <form method="post" onSubmit={func}>
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
            </form>
            </>
        );
      } else {
          window.location.replace('/');
      }
}