import React, { useContext, useEffect, useState } from "react";
import "./style.css"

const CombinedList = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTU1ODcxLCJpYXQiOjE2ODExNTIyNzEsImp0aSI6Ijc2OTJiZjc0MmRjODQzM2VhY2Y4YTA3N2NlOTM4NmIyIiwidXNlcl9pZCI6MX0.JyOlGnXti0piNT2trfCu03Ib23VReMl92BWWjKMAHeA")
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

    // console.log(combinedData)



    
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
        </table>

        <div className="clearButtonContainer">
            <button id="clearButton" onClick={() => clearCart()}> Empty Shopping Cart</button>
        </div>
        
        
        
        
        </>


        
    )

}

export default CombinedList; 