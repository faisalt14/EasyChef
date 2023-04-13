import React from "react";
import { createContext, useState } from "react";

export const useShoppingCartAPIContext = () => {
    const token = localStorage.getItem('token')

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