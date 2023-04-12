import React from "react";
import { createContext, useState } from "react";

export const useShoppingCartAPIContext = () => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjg5MDQ4LCJpYXQiOjE2ODEyODU0NDgsImp0aSI6IjQ4MTJkZTdlNWU4NjQ0NDQ4ZjFkMzVmMDMyNzdmMjNkIiwidXNlcl9pZCI6MX0.QPSO0h8betR2dLD0Jnlwc5CUlhldlAR8tC6zoitvykM"); 

    return {
        token, 
        setToken,
    }
} 

const ShoppingCartAPIContext = createContext({
    token: null, 
    setToken: () => {},
})

export default ShoppingCartAPIContext; 