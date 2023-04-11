import React, { useEffect, useState } from "react";
import RecipeCard from "../../../RecipeCard";
import GetRecipeDetails from "./GetRecipeDetails";
const IndividualList = () => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjQyNDk0LCJpYXQiOjE2ODEyMzg4OTQsImp0aSI6IjU3NTZkYWY1ZmI4OTRhOTdhZjI1ZjFhZTcyNWYyMDYyIiwidXNlcl9pZCI6MX0.73HrqqiCbc4ASiWMIbhzJruZC9Njkx0GzqBa_OHqRT4")
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