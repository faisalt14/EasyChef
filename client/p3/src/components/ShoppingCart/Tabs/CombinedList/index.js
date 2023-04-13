import React, { useContext, useEffect, useState } from "react";
import ShoppingCartAPIContext from "../../../../contexts/ShoppingCartAPIContext";
import "./style.css"

const CombinedList = () => {
    const [combinedData, setCombinedData] = useState([]);
    // const {token, setToken} = useContext(ShoppingCartAPIContext); 

    // Set token here 
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzQzNjI4LCJpYXQiOjE2ODEzNDAwMjgsImp0aSI6Ijc3ODc1YTIxNGM5NTRiM2I5MDgwODllNmZlNjcxN2U2IiwidXNlcl9pZCI6MX0.7jcyvfOuyp97MmqU3ZF4WSX-gfx5Fv63wIgbQclbvA4")
    const [clearCartClicks, setclearCartClicks] = useState(0); 
    const [value, setValue] = useState(['inital'])

    const getBody = () => {
        let ingDict = {}
        let result = []
        
        combinedData.forEach((dict, index) => {
            let toAdd = dict.quantity + ' ' + dict.unit
            if (ingDict[dict.name]){
                ingDict[dict.name] += ' and ' + toAdd
            }
            else{
                ingDict[dict.name] = toAdd
            }
        })

        for (let [key, value] of Object.entries(ingDict)){
            result.push(<tr key={key}>
                <td className="bodyIngredient"> {key} </td>
                <td className="bodyQuantity"> {value} </td>
            </tr>)
        }
        return result
    }

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

    const get_data = async () => {
        const response = await fetch("http://127.0.0.1:8000/accounts/combined-list/", {
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
              }
            
        })
        
        const data = await response.json()
        // console.log(response)

        {
            if (response.status == 200) {
                // console.log("good")
                setCombinedData(data)
            }
            else{
                setCombinedData([])
            }
        }

        // console.log(response)

    }



    useEffect( () => {
        

        {/** Reference: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token */}
        // const response = fetch("http://127.0.0.1:8000/accounts/combined-list/", {
        //     headers: { 
        //         'Content-Type': 'application/json',
        //        'Authorization': `Bearer ${token}`,
        //       }
            
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         setCombinedData(json); 
                
        //     })

        get_data()


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
                                    {getBody()}
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