import { Wrapper } from "@googlemaps/react-wrapper";
import React from 'react';

const API_KEY = '';

const render = (status) => {
    return <h1>{status}</h1>;
  };

//NOTE: ALL OF THIS CODE IS FROM THE GOOGLE MAPS API QUICK START
export function MN_MAP(props){
    return (
    <Wrapper apiKey={API_KEY} render={render}>
        <InternalMap/>
    </Wrapper>
    );
}

function InternalMap(props){
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
    if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {backgroundColor: 'blue', center: { lat: 47.444, lng: -122.176}, zoom: 2}));
  }
    }, [ref, map]);
    return <div ref={ref}/>;
}

