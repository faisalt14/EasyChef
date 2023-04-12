import React, { useEffect, useState } from "react";
import DisplayPopular from "../DisplayPopular";

const RecipeDetails = ({popularData}) => {

    // console.log("Popular Data recieved:", popularData)


    const [recipeDetails, setRecipeDetails] = useState([])


    useEffect( () => {
       
        // console.log("loaded")

        popularData.map((dict, index) => (
            fetch(`http://127.0.0.1:8000/recipes/${dict.id}/details/`, {     
            })
                .then(response => response.json())
                .then(json => {
                    /** Reference for concat: https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc */
                    {Object.keys(json).length > 0 ? setRecipeDetails(recipeDetails => recipeDetails.concat(json)) : [] }
    
                })
            
        ))

    }, [])

    // console.log("Popular Data recieved:", popularData)
    // console.log("Recipe Details Array:", recipeDetails)


    return (
        <>

            {Object.keys(popularData).length == Object.keys(recipeDetails).length ? <DisplayPopular  recipeDetails={recipeDetails} popularData={popularData}/> : []}

        </>
    )

}

export default RecipeDetails; 