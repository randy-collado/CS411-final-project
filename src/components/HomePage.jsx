import { ImagePagination } from '../ImagePagination.tsx'
import { useQuery } from '../hooks/hooks';
import './styles/MainPage.css'
import { Header } from './Header';
import { getDiaries } from '../controllers/diary';
import { useEffect, useState } from 'react';

export function HomePage(props){
    const [diaries, setDiaries] = useState([]);
    let query = useQuery();
    useEffect(async () => {
      const photoResponse = await getDiaries(query.get("user"));
      setDiaries(photoResponse.data.diaries);
      return photoResponse.data.diaries;
    }, [query]);
  if (sessionStorage.getItem('user') && sessionStorage.getItem('user') == query.get("user")){
    return (
          <>
          <Header displayHome={true} displayLogout={true} displayContact={false}/>
          <div className="homepage">
              <p align='center'>Hello, {query.get("user")}</p>
              <header className="App-header">
              <ImagePagination
                  pages={diaries}
                  dotDisplay={true}
              />
              </header>
          </div>
          </>
      );
  } else {
    window.location.replace('/');
  }
}