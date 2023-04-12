import React, { useEffect, useState } from "react";
import RecipeCard from "../../../RecipeCard";
import GetRecipeDetails from "./GetRecipeDetails";
const IndividualList = () => {
    // const {token, setToken} = useContext(ShoppingCartAPIContext); 

    // Set token here 
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjkwMzYwLCJpYXQiOjE2ODEyODY3NjAsImp0aSI6ImZjZTY3Y2IwZDE3NjRjZmY4Zjk4MTJkZjVmM2NiMDNiIiwidXNlcl9pZCI6MX0.eLUUTUrVsTnvM9etjWZpje64tBUTzplq9l2HnKPyl-Y")

    const [individualData, setIndividualData] = useState([]); 
    const [cardInfo, setCardInfo] = useState([]); 
    

    
    useEffect( () => {
        {/** Reference: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token */}

        {/** Get individual shopping list data */}
        fetch("http://127.0.0.1:8000/accounts/shopping-list/", {
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
              }
            
        })
            .then(response => response.json())
            .then(json => {
                {Object.keys(json).length > 0 ? setIndividualData(json)  : [] }
                // setIndividualData(json); 
                
            })        
    }, [])

    // console.log(Object.keys(individualData).length)
    // console.log("Cart Data:", individualData)

    return (
        <>
        
        {Object.keys(individualData).length > 0 ? < GetRecipeDetails cartInfo={individualData} /> : []}
        </>
    )





}

export default IndividualList; 