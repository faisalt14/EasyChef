import React, { useState } from "react";
import { signedInDropDown } from "./items";
import { Link } from "react-router-dom";
import "./style.css";
import ProfileModal from "../../../AccountComponents/ProfileModal";

/*Reference for dropdown: https://www.youtube.com/watch?v=HE8jtK4FSZY&list=LL&index=1&t=1721s*/
const LoggedInDropdown = () => {

    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            <ul className={ dropdown ? "submenu-clicked" : "submenu"} onClick={() => setDropdown(!dropdown)}>
                <ProfileModal />
            </ul>
        </>
    )
}

export default LoggedInDropdown;