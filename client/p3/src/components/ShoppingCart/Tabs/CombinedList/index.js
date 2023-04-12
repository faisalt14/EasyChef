import React, { useContext, useEffect, useState } from "react";
import ShoppingCartAPIContext from "../../../../contexts/ShoppingCartAPIContext";
import "./style.css"

const CombinedList = () => {
    const [combinedData, setCombinedData] = useState([]);
    // const {token, setToken} = useContext(ShoppingCartAPIContext); 

    // Set token here 
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjkwMzYwLCJpYXQiOjE2ODEyODY3NjAsImp0aSI6ImZjZTY3Y2IwZDE3NjRjZmY4Zjk4MTJkZjVmM2NiMDNiIiwidXNlcl9pZCI6MX0.eLUUTUrVsTnvM9etjWZpje64tBUTzplq9l2HnKPyl-Y")
    const [clearCartClicks, setclearCartClicks] = useState(0); 


    const [value, setValue] = useState(['inital'])

    const clearCart = () => {
        setclearCartClicks(clearCartClicks + 1)

        fetch(" http://127.0.0.1:8000/accounts/shopping-list/clear/", {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
              }
            
        })
       
    }



    useEffect( () => {
        

        {/** Reference: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token */}
        fetch("http://127.0.0.1:8000/accounts/combined-list/", {
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
              }
            
        })
            .then(response => response.json())
            .then(json => {
                setCombinedData(json); 
                
            })


    }, [clearCartClicks])

    // console.log(Object.keys(combinedData).length)



    
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

                {
                    Object.keys(combinedData).length == 0 ? (
                        <tbody>
                        
                        

                            <div className="empty-body-container"> 
                            
                                    <tr>
                                        <div className="empty-ingredient-quantity-container">
                                            <td className="emptyBodyIngredient" > - </td>
                                            <td className="emptyBodyQuantity" > - </td>
                                        </div>
                                    </tr>
                            
                            
                            </div>    
                        </tbody>

                    ) : 
                    (
                        <div className="bodyContainer">
                            <tbody className="body">
        
                                <div className="ingredient-quantity-container"> 
                                    { 
                                        combinedData.map( (dict, index) => (
                                            <tr key={index}>
                                                <td className="bodyIngredient"> {dict.name} </td>
                                                <td className="bodyQuantity"> {dict.quantity} {dict.unit}</td>
                                            </tr>
                                        ))
                                    }
                                </div>              
                            </tbody>
                        </div>  

                    )
                }

            </table>

            <div className="clearButtonContainer">
                <button id="clearButton" onClick={() => clearCart()}> Empty Shopping Cart</button>
            </div> 
        </>
 
    )
}

export default CombinedList; 