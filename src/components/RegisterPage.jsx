import { React } from "react";
import { createUser } from "../controllers/user";
import "tailwindcss/tailwind.css"
import { Header } from "./Header";
import { authSpotify } from "../controllers/spotifyContext";
function RegisterPage(props){

    const register = (event) =>
    {
        event.preventDefault();
        const username = event.currentTarget.elements.username.value;
        const password = event.currentTarget.elements.password.value;
        const email = event.currentTarget.elements.email.value;
        const response = createUser(username, password, email);
        response.then(response => {
            if (response.data.ecode === 0) console.log(response.data.username)
            else window.location.replace('/');
        });

        const token = authSpotify(username);
        token.then((response) => {
            if(response.data.ecode === 0){
                sessionStorage.setItem('user', username);
                window.location.replace('/home?user='+username);
            }
        });

    };

    return (
        <>
        <Header displayHome={true}/>
        <div>
            <form class="mb-6" method="post" onSubmit={register}>
            <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Email:
                <input class="border py-2 px-3 text-grey-darkest" type="email" id="email" name="email" />
            </label>
            </div>
            <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Username:
                <input class="border py-2 px-3 text-grey-darkest" type="text" id="username" name="username" />
            </label>
            </div>
            <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Password:
                <input class="border py-2 px-3 text-grey-darkest" type="text password" id="password" name="password" />
            </label>
            </div>
            <input class="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded" type="submit"/>
            </form>
        </div>
        </>
    );
}

export default RegisterPage;