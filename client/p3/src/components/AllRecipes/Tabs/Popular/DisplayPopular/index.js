import React, { useEffect, useState } from "react";
import RecipeCard from "../../../../RecipeCard";
import "./style.css"

const DisplayPopular = ({recipeDetails, popularData}) => {

    console.log("recipe details recieved:", recipeDetails)
    console.log("popular data recieved:", popularData)
    

    // const [popular, setPopular] = useState(popularData)
    // console.log("popular data recieved:", popular)

    useEffect( () => {
       
    }, [popularData])
    

    return (
        <>

        <div className='gridContainer'>

            <div className="allCardsContainer"> 

                {popularData.map((dict, index) => (
                    

                    <div className="cardContainer"> 
                    
                        < RecipeCard info={recipeDetails.filter(obj => obj.id == popularData[index].id)[0]}/> 
                    
                    </div>
                        // < RecipeCard info={recipeDetails[index]}/> 
                    
                ))}
            
            </div>

        </div>
                
        </>
    )
}

export default DisplayPopular; 