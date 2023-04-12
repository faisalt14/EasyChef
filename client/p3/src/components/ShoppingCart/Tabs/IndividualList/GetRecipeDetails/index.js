import React, { useEffect, useState } from "react";
import DisplayIndividualList from "../DisplayIndividualList";

const GetRecipeDetails = ({cartInfo}) => {

    
    const [recipeDetails, setRecipeDetails] = useState([])

    useEffect( () => {
       
        // console.log("loaded")

        cartInfo.map((dict, index) => (
            fetch(`http://127.0.0.1:8000/recipes/${dict.recipe_id}/details/`, {     
            })
                .then(response => response.json())
                .then(json => {
                    /** Reference for concat: https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc */
                    {Object.keys(json).length > 0 ? setRecipeDetails(recipeDetails => recipeDetails.concat(json)) : [] }
                    // setRecipeDetails(recipeDetails.concat(json));  


                    

                    {/**  */}
    
                })
            
        ))

    }, [])
    
    console.log("Cart Data:", cartInfo)
    console.log("Recipe Details Array:", recipeDetails)


    return (
        <>

            {Object.keys(cartInfo).length == Object.keys(recipeDetails).length ? <DisplayIndividualList cartInfo={cartInfo} recipeDetailsDict={recipeDetails} /> : []}

        </>
    )

}

export default GetRecipeDetails;