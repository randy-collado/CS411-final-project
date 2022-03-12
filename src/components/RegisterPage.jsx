import { React } from "react";
import "tailwindcss/tailwind.css"
function RegisterPage(props){
    return (
        <>
        <div>
            <form class="mb-6" method="post" action='/register'>
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