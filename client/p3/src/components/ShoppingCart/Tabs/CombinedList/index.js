import React from "react";
import "./style.css"

const CombinedList = () => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <div className="headerContainer"> 
                            
                            <div className="header">
                                <td className="ingredientHeader"> Ingredient</td>
                                <td className="quantityHeader"> Quantity</td>
                            </div>

                        </div>
                    </tr>
                </thead>

                <div className="bodyContainer">

                    <tbody className="body">

                        <div className="ingredient-quantity-container"> 
                            <tr>
                                <td className="bodyIngredient"> Ingrediet 1</td>
                                <td className="bodyQuantity"> Quantity 1</td>
                            
                            </tr>

                            <tr>
                            <td className="bodyIngredient"> Ingrediet 2</td>
                            <td className="bodyQuantity"> Quantity 2</td>
                        
                            </tr>

                            <tr>
                            <td className="bodyIngredient"> Ingrediet 3</td>
                            <td className="bodyQuantity"> Quantity 3</td>
                        
                            </tr>
                        </div>              
                    </tbody>
                </div>     
        </table>

        <div className="clearButtonContainer">
            <button id="clearButton"> Empty Shopping Cart</button>
        </div>
        
        
        
        
        </>


        
    )

}

export default CombinedList; 