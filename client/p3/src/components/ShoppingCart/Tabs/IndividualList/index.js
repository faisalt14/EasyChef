import React, { useEffect, useState } from "react";
import RecipeCard from "../../../RecipeCard";
import GetRecipeDetails from "./GetRecipeDetails";
const IndividualList = () => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTkzNDQ0LCJpYXQiOjE2ODExODk4NDQsImp0aSI6ImNjZTgxZGQzNWE3NTQwMzU5ZGU2N2FmNjQ1YzU0OTk2IiwidXNlcl9pZCI6MX0.zBhVQ1XqScXomqlkfj5qcuwN5UCQ6ReHR7Y-1XOn3t0")
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

        
        
        // Object.keys(individualData).length > 0 
          

        // individualData.map((dict, index) => (
        //     fetch(`http://127.0.0.1:8000/recipes/${dict.recipe_id}/details/`, {     
        //     })
        //         .then(response => response.json())
        //         .then(json => {
        //             {Object.keys(json).length > 0 ? setCardInfo(json)  : [] }
        //             // setCardInfo(json); 
    
        //         })
            
        // ))

             
           
        
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