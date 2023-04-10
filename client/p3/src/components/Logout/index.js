import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoggedInContext from "../../contexts/LoggedInContext";
import Home from "../Home";

const Logout = () => {
    const {loggedIn, setLoggedIn} = useContext(LoggedInContext); 


    return (
        <>
            <div> Are you sure you want to logout?</div>

            <Link to="/"> 
            
            <button 
                onClick={() =>  setLoggedIn(false)}
                style={{"margin": 10, "padding": 3}}
            > Yes  
            </button>
            
            </Link>


            <button
                style={{"margin": 10, "padding": 3}}
            > 
            No  
            </button>

            
        </>
    )

}

export default Logout;