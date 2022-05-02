import { NavLink} from "react-router-dom";

function LoginButton(props){
    if (props.isLoggedIn){
        return <></>;
    } else {
        return (
            <>
               <NavLink className="nav-link" to="/login">
                  Login
                  <span className="sr-only">(current)</span>
                </NavLink> 
            </>
        );
    }
}

export default LoginButton;