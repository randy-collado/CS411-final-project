import {useEffect, useState} from 'react';

function Date(props){
    const [currentDate, setCurrentDate] = useState(0);
    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
            setCurrentDate(data.time);
        });
        }, []);
      return (
        <div>
          <p>The current date is {currentDate}</p>
        </div>
      );
    }



export default Date;