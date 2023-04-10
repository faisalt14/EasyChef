import React, { useState } from "react";
import "./style.css";

import CombinedList from "./Tabs/CombinedList";
import IndividualList from "./Tabs/IndividualList";

{/* Reference for making tabs: https://blog.logrocket.com/how-to-build-tab-component-react/ */}

const ShoppingCart = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    

    return (
        <>
            {/*  reference for box-shadow: https://getcssscan.com/css-box-shadow-examples  */}
            <div id="banner">
                <h2>Shopping Cart</h2>
            </div>

            <div className="Tabs">
                {/* Tab nav */}
                <ul className="nav">
                    <li 
                        className={activeTab === "tab1" ? "active" : "non-active"}
                        onClick={() => setActiveTab("tab1")}
                    >
                        Combined List
                    </li>
                    <li 
                        className={activeTab === "tab2" ? "active" : "non-active"}
                        onClick={() => setActiveTab("tab2")}
                    >
                        Individual List
                    </li>
                </ul>
                <div className="outlet">
                    {/* content will be shown here */}
                    {activeTab === "tab1" ? <CombinedList/> : <IndividualList/>}
                </div>
            </div>


        
        </>
    )

}

export default ShoppingCart; 