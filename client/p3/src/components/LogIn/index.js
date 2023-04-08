import React, { useContext, useState } from "react";
import LoggedInContext from "../../contexts/LoggedInContext";

const Login = () => {
    const {loggedIn, setLoggedIn} = useContext(LoggedInContext); 

    const {bool, setBool} = useState(false);



    return (
        <>
            <button onClick={() => setLoggedIn(!loggedIn)}> Log in</button>
            
        </>
    )

}

export default  Login;