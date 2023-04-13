import React from "react";
import { createContext, useState } from "react";

export const useShoppingCartAPIContext = () => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzQzNjI4LCJpYXQiOjE2ODEzNDAwMjgsImp0aSI6Ijc3ODc1YTIxNGM5NTRiM2I5MDgwODllNmZlNjcxN2U2IiwidXNlcl9pZCI6MX0.7jcyvfOuyp97MmqU3ZF4WSX-gfx5Fv63wIgbQclbvA4"); 

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