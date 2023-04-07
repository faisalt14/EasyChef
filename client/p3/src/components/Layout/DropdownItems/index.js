import React, { useState } from "react";
import { accountsDropDown } from "./items";
import { Link } from "react-router-dom";
import "./style.css";

/*Reference for dropdown: https://www.youtube.com/watch?v=HE8jtK4FSZY&list=LL&index=1&t=1721s*/
const Dropdown = () => {

    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            <ul className={ dropdown ? "submenu-clicked" : "submenu"} onClick={() => setDropdown(!dropdown)}>
                {accountsDropDown.map( item => {
                    return (
                        <li key={item.id}>
                            <Link
                                to={item.path} 
                                className={item.Cname}
                                onClick={() => setDropdown(false)}
                             >
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Dropdown;