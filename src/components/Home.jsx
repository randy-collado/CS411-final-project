import React from "react";
import Date from "./Date.jsx";
import { MN_MAP } from './Map';
import { Header } from "./Header.jsx";


function Home() {
  return (
    <>
    <Header displayHome={true} displaySubmit={true} displayLogout={false} displayRegister={true}/>
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://picsum.photos/900/400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Home</h1>
            <Date/>
          </div>
          <MN_MAP/>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;