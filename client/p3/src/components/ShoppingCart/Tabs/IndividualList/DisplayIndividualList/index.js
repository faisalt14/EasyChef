import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "../../../../RecipeCard";
import './style.css'
import $ from 'jquery';
import IndividualList from "..";
import CombinedList from "../../CombinedList";

const DisplayIndividualList = ({cartInfo, recipeDetails}) => {


    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjY2NTg0LCJpYXQiOjE2ODEyNjI5ODQsImp0aSI6ImIyYTcwZTk3YTgzOTRmYTQ4NmJjZGE4NWVjZmQwZDkwIiwidXNlcl9pZCI6MX0.5rrcTLUoK7sLvgGpHD_q5Voox_YFaA2EVmC3rvHwzAY")

    const [buttonClicks, setButtonClicks] = useState(0); 
    const [shoppingCartInfo, setShoppingCartInfo] = useState(cartInfo); 
    const [updateInfo, setUpdateInfo] = useState({
        recipe_id : 0, 
        new_serving : 0

    })
    const [currentRecipeId, setCurrentRecipeId] = useState(0)


    const update_states = (recipeId, newServing) => {
        setUpdateInfo({recipe_id: recipeId, new_serving: newServing })
        setButtonClicks(buttonClicks + 1)

    }

    const update_serving_size = async () => {
        const response = await fetch(`http://127.0.0.1:8000/accounts/shopping-list/update-serving-size/${updateInfo.recipe_id}/`, {
                            method: 'PATCH',
                            headers: { 
                                'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            }, 
                            body: JSON.stringify({ 'recipe_id' : updateInfo.recipe_id, 'servings_num': updateInfo.new_serving })
                            
                        })
        const data = await response.json();
        // console.log(data)
        update_cartInfo()
        

    }

    const update_cartInfo = async () => {
        // {console.log('updating info')}

        const response = await fetch("http://127.0.0.1:8000/accounts/shopping-list/", {
                                headers: { 
                                    'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                                }
                                })
        const data = await response.json();
        // console.log(data)
        setShoppingCartInfo(data)

                    
    }



      

    useEffect( () => {
        
        // {console.log("recipe_id state:", updateInfo.recipe_id)}
        // {console.log("new_serving state:", updateInfo.new_serving)}

        // {console.log("Recipe Details:", recipeDetails)}
        // {console.log("shoppingCartInfo :", cartInfo)}


        { (updateInfo.recipe_id == 0 && updateInfo.new_serving == 0) ?  
           (
               []
                // console.log("both 0")
           ) :
           (
                // console.log("recipe_id state:", updateInfo.recipe_id),
                // console.log("new_serving state:", updateInfo.new_serving),

                    
                update_serving_size()
                
                
           )
        
        }
        



    }, [buttonClicks])



    return(
        <>
            {/**

            <h1> Display Individual List Page</h1>
            {console.log("Cart Data:" ,cartInfo)}
            {console.log("Recipes Data:" ,recipeDetails)}


            {console.log(recipeDetails[0].id)}
            */}

            { Object.keys(shoppingCartInfo).length == 0 ? ([]) : 
            
            
            

            <table>
                <tr>
                    <div className="tab2HeaderContainer">
                        <div className="tab2Header">
                            <td className="cardHeader"> Recipe </td>
                            <td className="ingredientsHeader"> Ingregients</td>
                        </div>
                    </div>
                </tr>

                <div className="tab2BodyContainer">
                

                    <tbody>

                        <div className="card-ingredients-container">
                          
                            {recipeDetails.map( (dict, index) => (
                                
                                
                                <div className="rowContainer"> 
                                <tr key={index} > 

                                    
                                            
                                    <td className="cardContainer"> 
                                        <div className="card">
                                            < RecipeCard info={recipeDetails[index]}/> 
                                        </div>
                                    </td>
                                    


                                    <td className="ingredientsColumn">
                                        
                                        <div className="ingredientsColumnContainer">

                                            <div className="ingredientsBox">

                                                <ul className="ingredientsList">

                                                
                                                
                                                {/**  shoppingCartInfo[index].ingredients
                                                    shoppingCartInfo.filter(obj => obj.recipe_id == recipeDetails[index].id)[0].ingredients
                                                */}

                                                { /** console.log( "cart recipe id", shoppingCartInfo.filter(obj => obj.recipe_id == recipeDetails[index].id)[0] ) */}
                                                { /** console.log( "recipe details recipe id", recipeDetails[index].id) */}

                                                {(shoppingCartInfo.filter(obj => obj.recipe_id == recipeDetails[index].id)[0].ingredients).map( (ingredientsDict, i) => (
                                                    <li className="listItem" key={i} > {ingredientsDict.name}  {ingredientsDict.quantity} {ingredientsDict.unit}</li>
                                                    
                                                ))}
                                                
                                    
                                                </ul>
                                            </div>
                                            
                                            {/** 
                                               $(this).closest("div.ingredientColSecondRow").find("input[name='serving']").val()

                                               onChange={ () => console.log(document.getElementById(cartInfo[index].recipe_id + "-serving").value) }
                                            
                                            */}

                                            <div className="ingredientColSecondRow">
                                                <label className="servingsLabel"> Servings: <input type="number" className="servingsInput" name="serving" id={recipeDetails[index].id + "-serving"} defaultValue={shoppingCartInfo.filter(obj => obj.recipe_id == recipeDetails[index].id)[0].servings_num}/> </label>
                                                <button className="servingsUpdateButton" onClick={ () => 
                                                    update_states(recipeDetails[index].id, document.getElementById(recipeDetails[index].id + "-serving").value )} > Update</button>
                                                <button className="deleteButton"> Remove </button>
                                            </div>
                                        </div>
                                         
                                    </td>


                               </tr>
                               </div>

                                

                              
            
                            ))}
                                    

                                    
                                    
                                    
                                    

                         


                        </div>

            
                    </tbody>

                </div>  
            
            </table>

            }

        
        </>
    )


}

export default DisplayIndividualList;