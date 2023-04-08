import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.css"
import {FaBars, FaTimes, FaUser} from "react-icons/fa"; 
import Select from 'react-select'; 
import { navItems } from "./NavItems/items";
import { useRef } from 'react';
import NotLoggedInDropdown from "./Dropdown/NotLoggedIn";
import LoggedInDropdown from "./Dropdown/LoggedIn";
{/*Reference for using react-icons: https://www.youtube.com/watch?v=amf18mxNX18&t=331s  */}


{/* Reference for navbar: https://www.youtube.com/watch?v=P3W7MZ3JkyA */}
const Layout = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);  



    return (
       
        <>
            <nav id="navbar">

                {/** Logo with link to home */}
                <Link id="logo" to="/">                 
                    <img src="https://www.linkpicture.com/q/Big-Bite-4.png" alt="react logo" style={{ width: '6rem', height: "5rem"}}/>
                </Link>

                {/* class name depends on whether the state isMobile or not */}
                <ul 
                    className={isMobile ? "nav-links-mobile" : "nav-links"}
                    onClick={() => setIsMobile(false)}
                >   
                
                    {/**

                    <Link to="/" className="allRecipes"> All Recipes </Link>
                    <Link to="/" className="myRecipes"> My Recipes </Link>
                    <Link to="/" className="newRecipe"> Create New Recipe </Link>
                    <Link to="/" className="shoppingCart"> My Shopping List </Link>  
                    
                    */}

                    {/* Display all navbar items */}
                    {navItems.map( item => {
                        return (
                            
                                <Link
                                    to={item.path} 
                                    className={item.Cname}
                                    key={item.id}
                                >
                                    {item.title}
                                </Link>
                        )
                    })}


                    {/* Add dropdown to navbar */}
                    <button id="dropdownButton" 
                        onClick={() => setDropdown(!dropdown)}

                    > <FaUser id="accountLogo"/> </button>
                    { /* {dropdown && <NotLoggedInDropdown />}  */  }

                    { /* {(dropdown && loggedIn) ? (< LoggedInDropdown />) : (< NotLoggedInDropdown/>)} */}

                    { loggedIn ? (dropdown && <LoggedInDropdown/>) :  (dropdown && <NotLoggedInDropdown />)}
                    

                </ul>
                
                {/* Collapased hamburger button */}
                <button 
                    id="mobile-menu-icon"
                    onClick={() => setIsMobile(!isMobile)}
                >
                    {isMobile ? <FaTimes className="collapseButton"/> : <FaBars className="collapseButton"/>}

                </button>

            </nav>

        </>

    
    )

}

export default Layout;