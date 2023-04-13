import React, { useEffect, useState } from "react";
import RecipeCard from "../../../../RecipeCard";
import "./style.css"

const DisplayPopular = ({popularData}) => {
    console.log("popular data recieved:", popularData)
    

    // const [popular, setPopular] = useState(popularData)
    console.log("popular data recieved:", popularData)

    useEffect( () => {
       
    }, [popularData])
    

    return (
        <>

        <div className='gridContainer'>

            <div className="allCardsContainer"> 

                {popularData.map((dict, index) => (
                    

                    <div className="cardContainer"> 
                    
                        < RecipeCard info={dict}/> 
                    
                    </div>
                        // < RecipeCard info={recipeDetails[index]}/> 
                    
                ))}
            
            </div>

        </div>
                
        </>
    )
}

export default DisplayPopular; 