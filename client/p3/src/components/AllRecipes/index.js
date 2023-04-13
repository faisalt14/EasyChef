import React, { useContext, useState } from "react";
import "./style.css";
import All from "./Tabs/All";
import Popular from "./Tabs/Popular";



{/* Reference for making tabs: https://blog.logrocket.com/how-to-build-tab-component-react/ */}

const AllRecipes = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <>
            {/*  reference for box-shadow: https://getcssscan.com/css-box-shadow-examples  */}
            <div id="banner">
                <h2>All Recipes</h2>
            </div>

            <div className="Tabs">
                {/* Tab nav */}
                <ul className="nav">
                    <li 
                        className={activeTab === "tab1" ? "active" : "non-active"}
                        onClick={() => setActiveTab("tab1")}
                    >
                        Popular
                    </li>
                    <li 
                        className={activeTab === "tab2" ? "active" : "non-active"}
                        onClick={() => setActiveTab("tab2")}
                    >
                       Full List 
                    </li>
                </ul>
                <div className="outlet">
                    {/* content will be shown here */}
                    {activeTab === "tab1" ? <Popular/> : <All/>}
                </div>
            </div>


        
        </>
    )

}

export default AllRecipes; 