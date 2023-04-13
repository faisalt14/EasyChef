import React, { useEffect, useState } from "react";
import DisplayPopular from "../DisplayPopular";

const RecipeDetails = ({popularData}) => {

    // console.log("Popular Data recieved:", popularData)

    useEffect( () => {
       
        // console.log("loaded")

        popularData.map((dict, index) => (
            fetch(`http://127.0.0.1:8000/recipes/${dict.id}/details/`, {     
            })
                .then(response => response.json())
            
        ))

    }, [])

    // console.log("Popular Data recieved:", popularData)
    // console.log("Recipe Details Array:", recipeDetails)


    return (
        <>

            <DisplayPopular popularData={popularData}/>

        </>
    )

}

export default RecipeDetails; 