import React, { useContext } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.css"
import {FaBars, FaTimes, FaUser} from "react-icons/fa"; 
import Select from 'react-select'; 
import { navItems } from "./NavItems/items";
import { useRef } from 'react';
import NotLoggedInDropdown from "./Dropdown/NotLoggedIn";
import LoggedInDropdown from "./Dropdown/LoggedIn";
import LoggedInContext from "../../contexts/LoggedInContext";
import { Search } from 'react-bootstrap-icons'
{/*Reference for using react-icons: https://www.youtube.com/watch?v=amf18mxNX18&t=331s  */}


{/* Reference for navbar: https://www.youtube.com/watch?v=P3W7MZ3JkyA */}
const Layout = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(false);  
    const {loggedIn, setLoggedIn} = useContext(LoggedInContext); 



    return (
       
        <>
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light" style={{height: '96px'}}>

                {/** Logo with link to home */}
                    <Link id="logo" to="/">                 
                    <img id="logoImg" src="https://www.linkpicture.com/q/Big-Bite-4.png" alt="react logo" style={{width: "100px", overflow:"hidden", marginBottom: "-26px", marginTop: "-26px"}}/>
                </Link>



                {/* class name depends on whether the state isMobile or not */}
                <ul 
                    className={isMobile ? "nav-links-mobile" : "nav-links"}
                    onClick={() => setIsMobile(false)}
                >   
 

            

                    {/*Search Bar*/}
                    {/** 
                        
                        <input id="navSearchBar" type="text" placeholder={"Search for a Recipe..."}/> 

                        <div className="search-bar-wrapper">
                            <Search className="magnifying-glass-icon" style={{cursor:'pointer'}} />
                            <input className="search-bar" type="text" id="searchBar" name="search" placeholder="Search for a Recipe..."></input>
                        </div>
                
                
                    */}

                    <div className="search-bar-wrapper-nav">
                        <Search className="magnifying-glass-icon-nav" style={{cursor:'pointer'}} />
                        <input className="search-bar-nav" type="text" id="searchBar" name="search" placeholder="Search for a Recipe..."></input>
                    </div>
                    


                    
    


    

                    {/* Display all navbar items */}
                    {navItems.map( item => {
                        return (
                            
                                <Link
                                    to={item.path} 
                                    className={item.Cname}
                                    key={item.id}
                                    style={{fontSize:'17px'}}
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
            <Outlet/>

        </>

    
    )

}

export default Layout;