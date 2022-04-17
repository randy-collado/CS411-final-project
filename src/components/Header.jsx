import React from "react";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useQuery } from "../hooks/hooks";

export function Header(props) {
  function HomeButton(){
    let home = '/';
    if (sessionStorage.getItem('user')){
      home = '/home?user=' + sessionStorage.getItem('user');
    }
    if (props.displayHome){
      return (
        <>
        <NavLink className="navbar-brand" to={home}>
            MusicNote
          </NavLink>
        </>
      );
    }
    return <></>;
  }

  function LoginLink(){
    if (props.displayLogin){
      <li className="nav-item">
        <LoginButton isLoggedIn={false}/>
      </li>
    }
    return <></>;
  }

  function AboutLink(){
    if (props.displayAbout){
      return (
      <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </li>
      </>
      );
    }
    return <></>;
  }

  function RegisterLink(){
    let query = useQuery();
    
    if (props.displayRegister === true){
      return (
      <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
      </>
      );
    } else if (props.displayRegister === false && (sessionStorage.getItem('user') && sessionStorage.getItem('user') == query.get("user"))){
      return (
        <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Home
          </NavLink>
        </li>
        </>
      );
    }
    
  }

  function LogoutLink(){
    if (props.displayLogout === true){
      return (
      <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={() => sessionStorage.clear()}>
          Log Out
        </NavLink>
      </li>
      </>
      );
    } else if (props.displayLogout === false) {
      return (
      <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login" onClick={() => console.log("Logged in!")}>
          Log In
        </NavLink>
      </li>
      </>
      );
    }
    
  }

  function ContactLink(){
    if (props.displayContact === true){
      return (
      <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">
          About
        </NavLink>
      </li>
      </>
      );
    } else if (props.displayContact === false){
      const path = "/addDiary?user=" + sessionStorage.getItem('user');
      return (
      <>
      <li className="nav-item">
        <NavLink className="nav-link" to={path}>
          Add Diary
        </NavLink>
      </li>
      </>
      );
    }
  }

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar text-light bg-dark">
        <div className="container">
          {HomeButton()}
          <div>
            <ul className="navbar-nav ml-auto">
              {LoginLink()}
              <li className="nav-item">
                {AboutLink()}
              </li>
              <li className="nav-item">
                {ContactLink()}
              </li>
              <li className="nav-item">
                {RegisterLink()}
              </li>
              <li className="nav-item">
                {LogoutLink()}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

