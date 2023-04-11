import React from "react";
import RecipeCard from "../../../../RecipeCard";
import './style.css'

const DisplayIndividualList = ({cartInfo, recipeDetails}) => {

    return(
        <>
            {/**

            <h1> Display Individual List Page</h1>
            {console.log("Cart Data:" ,cartInfo)}
            {console.log("Recipes Data:" ,recipeDetails)}


            {console.log(recipeDetails[0].id)}
            */}

            {console.log(cartInfo[0].ingredients)}

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

                                                {(cartInfo[index].ingredients).map( (ingredientsDict, i) => (
                                                    <li className="listItem" > {ingredientsDict.name}  {ingredientsDict.quantity} {ingredientsDict.unit}</li>
                                                    
                                                ))}
                                                
                                    
                                                </ul>
                                            </div>
                                            
                                            <div className="ingredientColSecondRow">
                                                <label className="servingsLabel"> Servings: <input type="number" className="servingsInput" id="quantity"/></label>
                                                <button className="servingsUpdateButton"> Update</button>
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

        
        </>
    )


}

export default DisplayIndividualList;