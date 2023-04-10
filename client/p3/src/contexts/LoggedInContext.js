import { createContext, useState } from "react";

export const useLoggedInContext = () => {
    const [loggedIn, setLoggedIn] =  useState(false); 

    return {
        loggedIn, 
        setLoggedIn
    }
}


const LoggedInContext = createContext({
    loggedIn: null, 
    setLoggedIn: () => {}, 
}) 

export default LoggedInContext