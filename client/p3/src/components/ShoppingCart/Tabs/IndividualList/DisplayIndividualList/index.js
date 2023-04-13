import React, { useCallback, useEffect, useState } from "react";
import RecipeCard from "../../../../RecipeCard";
import './style.css'
import $ from 'jquery';
import IndividualList from "..";
import CombinedList from "../../CombinedList";
import GetRecipeDetails from "../GetRecipeDetails";

const DisplayIndividualList = ({cartInfo, recipeDetailsDict}) => {


    // const {token, setToken} = useContext(ShoppingCartAPIContext); 

    
    // Set token here 
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzQzNjI4LCJpYXQiOjE2ODEzNDAwMjgsImp0aSI6Ijc3ODc1YTIxNGM5NTRiM2I5MDgwODllNmZlNjcxN2U2IiwidXNlcl9pZCI6MX0.7jcyvfOuyp97MmqU3ZF4WSX-gfx5Fv63wIgbQclbvA4")

    const [recipeDetails, setRecipeDetails] = useState(recipeDetailsDict);
    const [updateClicked, setUpdateClicked] = useState(false); 
    const [removeClicked, setRemoveClicked] = useState(false)
    const [updateClicks, setUpdateClicks] = useState(0); 
    const [removeClicks, setRemoveClicks] = useState(0); 
    const [removeRecipeID, setRemoveRecipeID] = useState(0)
    const [shoppingCartInfo, setShoppingCartInfo] = useState(cartInfo); 
    const [updateInfo, setUpdateInfo] = useState({
        recipe_id : 0, 
        new_serving : 0

    })
   
    const clearCart = () => {
        // setclearCartClicks(clearCartClicks + 1)

        setRecipeDetails([])

        fetch(" http://127.0.0.1:8000/accounts/shopping-list/clear/", {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
              }
            
        })
       
    }

    const remove_recipeDetail = (recipeId, recipeDetailsDict) => {

       


        const item_remove = recipeDetailsDict.filter( obj => obj.id == recipeId)[0]
        const i =  recipeDetailsDict.indexOf(item_remove);



        // recipeDetailsDict = recipeDetailsDict.filter( dict => dict !=  item_remove)
        // setRecipeDetails( recipeDetailsDict)

        // setRecipeDetails((current) =>
        // current.filter((dict) => dict.id !== recipeId )
        // );

        // console.log("recipeDetails:", recipeDetails)
        // console.log('Item to delete:', item_remove)
        // console.log('Index of item:', i)

        {$(`#${i}`).remove(); }

        // update_cartInfo()

        


        
        

    } 


    const update_servings_states = (recipeId, newServing) => {
        setUpdateInfo({recipe_id: recipeId, new_serving: newServing })
        setUpdateClicked(true)
        setUpdateClicks(updateClicks + 1)

    }

    const update_remove_states = (recipeId)  => {
        setRemoveRecipeID(recipeId)
        setRemoveClicked(true)
        setRemoveClicks(removeClicks + 1)

        // console.log("Recipe to remove:", removeRecipeID)
        // remove_recipe()

    }

    const remove_recipe = async () => {
        // console.log("Recipe to remove:", removeRecipeID)
        const response = await fetch(`http://127.0.0.1:8000/accounts/shopping-list/remove/${removeRecipeID}/`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            }
            
        })

        

        remove_recipeDetail(removeRecipeID, recipeDetails)


        
        // update_cartInfo()

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
        console.log(data)
        setUpdateClicked(false)
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
        console.log(data)
        setShoppingCartInfo(data);

        
    }

    useEffect( () => {
        
        // {console.log("recipe_id state:", updateInfo.recipe_id)}
        // {console.log("new_serving state:", updateInfo.new_serving)}

        // {console.log("Recipe Details:", recipeDetails)}
        // {console.log("shoppingCartInfo :", cartInfo)}


        { (updateInfo.recipe_id == 0 && updateInfo.new_serving == 0) || (updateClicked == false && removeClicked == false)  ?  
           (    
                //    represents inital load
               []
                
           ) :
           (
               []
           )     
        
        }

        // Check if update or remove was clicked 

        { updateClicked == true ? (
            update_serving_size()
        ) : 
            []

        }

        { removeClicked == true ? (
            remove_recipe()
        ) : 
            []

        }

        // console.log(recipeDetails)
        



    }, [updateClicks, removeClicks])



    return(
        <>
            {/**

            <h1> Display Individual List Page</h1>
            {console.log("Cart Data:" ,cartInfo)}
            {console.log("Recipes Data:" ,recipeDetails)}


            {console.log(recipeDetails[0].id)}
            */}

            { Object.keys(shoppingCartInfo).length == 0 ? 
                (

                    []


            ) : 
            
            
            

            <table id="myTable">
                <tr>
                    <div className="tab2HeaderContainer">
                        <div className="tab2Header">
                            <td className="cardHeader"> Recipe </td>
                            <td className="ingredientsHeader"> Ingredients</td>
                        </div>
                    </div>
                </tr>

                <div className="tab2BodyContainer">
                

                    <tbody>

                        <div className="card-ingredients-container">
                          
                            {recipeDetails.map( (dict, index) => (
                                
                                
                                <div className="rowContainer"> 
                                <tr key={index} id={index} > 

                                    
                                            
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
                                                    <li className="listItem" key={i} > {ingredientsDict.quantity} {ingredientsDict.unit} of {ingredientsDict.name}  </li>
                                                    
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
                                                    update_servings_states(recipeDetails[index].id, document.getElementById(recipeDetails[index].id + "-serving").value )} > Update</button>
                                                <button 
                                                    className="deleteButton" 
                                                    onClick={ () => update_remove_states(recipeDetails[index].id)}
                                                > 
                                                Remove 
                                                </button>
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

            <div className="clearButtonContainer">
            <button id="clearButton" onClick={() => clearCart()}> Empty Shopping Cart</button>
            </div> 

        
        </>
    )


}

export default DisplayIndividualList;