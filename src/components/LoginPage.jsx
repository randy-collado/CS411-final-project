import { React } from "react";
import { loginUser } from "../controllers/user";
import { useNavigate } from "react-router-dom";
import  './styles/LoginPage.css';
import "tailwindcss/tailwind.css"
import { Header } from "./Header.jsx"

const login = (event) => {
    event.preventDefault();
    const username = event.currentTarget.elements.username.value;
    const password = event.currentTarget.elements.password.value;
    const response = loginUser(username, password);
    response.then((response) => {
        
            console.log(response.data.ecode);
            sessionStorage.setItem('user', username);
            window.location.replace('/home?user='+username);
        
    }).catch(error => console.log(error));
};
function LoginPage(props){
    return (
        <>
        <Header displayHome={true} displayLogout={undefined}/>
        <div>
            <form className="mb-6" method="post" onSubmit={login}>
            <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Username:
                <input className="border py-2 px-3 text-grey-darkest" type="text" name="username" />
            </label>
            </div>
            <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Password:
                <input className="border py-2 px-3 text-grey-darkest" type="text password" name="password" />
            </label>
            </div>
            <button className="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Login</button>
            </form>
        </div>
        </>
    );
}

export default LoginPage;