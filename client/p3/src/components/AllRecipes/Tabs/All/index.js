import React, { useEffect, useState } from "react";
import RecipeCard from "../../../RecipeCard";
import "./style.css"

const All = () => {

    const [recipeInfo, setRecipeInfo] = useState([])

    useEffect( () => {

        // console.log(filter)


        fetch('http://127.0.0.1:8000/recipes/all-recipes/')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setRecipeInfo(json['results'])
                // console.log(json['results'])

                
            })  
            

    
    }, [])


    return (
        <>

        <div className='aRGridContainer'>

            <div className="aRAllCardsContainer"> 

                {recipeInfo.map((dict, index) => (
                    

                    <div className="aRCardContainer"> 
                    
                        < RecipeCard info={recipeInfo[index]}/> 
                    
                    </div>
                        // < RecipeCard info={recipeDetails[index]}/> 
                    
                ))}
            
            </div>

        </div>
                
        </>
    )
    
}

export default All; 