import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoggedInContext from "../../contexts/LoggedInContext";

const Login = () => {
    const {loggedIn, setLoggedIn} = useContext(LoggedInContext); 

    return (
        <>


            < Link to="/"> 
            
            <button 
                onClick={() =>  setLoggedIn(true)}
                style={{"margin": 10, "padding": 3}}
            > Login  
            </button>
            
            </Link>
            
        </>
    )

}

export default  Login;