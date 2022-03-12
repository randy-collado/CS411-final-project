import { React } from "react";
import  './styles/LoginPage.css';
import "tailwindcss/tailwind.css"
function LoginPage(props){
    return (
        <>
        <div>
            <form class="mb-6" method="post">
            <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Username:
                <input class="border py-2 px-3 text-grey-darkest" type="text" name="username" />
            </label>
            </div>
            <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" >
                Password:
                <input class="border py-2 px-3 text-grey-darkest" type="text password" name="password" />
            </label>
            </div>
            <button class="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Login</button>
            </form>
        </div>
        </>
    );
}

export default LoginPage;