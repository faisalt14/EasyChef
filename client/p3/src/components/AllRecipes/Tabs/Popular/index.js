import React, { useEffect, useState } from "react";
import Select from "react-select";
import DisplayPopular from './DisplayPopular'
import "./style.css"




const Popular = () => {

    const options = [
        { value: "total_reviews", label: "Most Reviewed" },
        { value: "total_likes", label: "Most Liked" },
        { value: "total_favs", label: "Most Favourited" },
      ];


    const [filter, setFilter] = useState(""); 
    const [popularData, setPopularData] = useState([]); 

    useEffect( () => {

        // console.log(filter)

        { if (filter !== "") {

            fetch(`http://127.0.0.1:8000/recipes/popular/${filter}/`)
                .then(response => response.json())
                .then(json => {
                    // {Object.keys(json).length > 0 ? setIndividualData(json)  : [] }
                    setPopularData(json['results'])
                    // console.log(json['results'][0])
                    
                })  
            
        } else {

            {}
        }
    
    }
    
    }, [filter])




    return (
        <>
        <div className="filterContainer">
           
            <div className="selectionContainer"> 
                <Select
                id="dropdown"
                placeholder="Select a filter"
                options={options}
                onChange={(e) => {
                    
                    setFilter(e.value)
                }}
            />

          </div>
        </div>

        {Object.keys(popularData).length > 0 ? < DisplayPopular popularData={popularData} /> : []}
        </>
    )
}

export default Popular; 