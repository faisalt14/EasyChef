import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Form from 'react-bootstrap/Form'
import $ from 'jquery'
import CookingTime from '../../Filters/CookingTime'
import Cuisine from '../../Filters/Cuisine'
import Diet from '../../Filters/Diet'
import Meal from '../../Filters/Meal'
import SearchCategory from '../../Filters/SearchCategory'

function HomeSearch(props) {
    const [selectedCookingTime, setSelectedCookingTime] = useState(0)
    const [selectedCuisine, setSelectedCuisine] = useState(14)
    const [selectedDiet, setSelectedDiet] = useState([])
    const [selectedMeal, setSelectedMeal] = useState(6)
    const [selectedCategory, setSelectedCategory] = useState(0)

    const update = () => {
    }

    useEffect(() =>{
        /*$.ajax({
            url: 'http://127.0.0.1:8000/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })*/
    })

    return(
        <>
        <div className="home-search-wrapper">
            <div className="home-search-bg"></div>
            <Form>
                <h1 className="home-search-title">
                    Search for Recipes
                </h1>
                <div className="home-search-bar-wrapper">
                    <input className="home-search-bar" type="text" id="search" name="search"></input>
                    <input className="home-search-submit" type="submit" value="Search"></input>
                </div>
                
                <div className="home-search-filters-wrapper">
                    <div className="dropdown-wrapper">
                        <SearchCategory selectedCookingTime={selectedCookingTime} setSelectedCategory={setSelectedCategory}/>
                    </div>
                    <div className="dropdown-wrapper">
                        <CookingTime selectedCookingTime={selectedCookingTime} setSelectedCookingTime={setSelectedCookingTime}/>
                    </div>
                    <div className="dropdown-wrapper">
                        <Cuisine selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine}/>
                    </div>
                    <div className="dropdown-wrapper">
                        <Meal selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal}/>
                    </div>
                    <div className="dropdown-wrapper">
                        <Diet selectedDiet={selectedDiet} setSelectedDiet={setSelectedDiet}/>
                    </div>
                </div>

            </Form>
        </div>
        </>
    );
}

export default HomeSearch;

/*
<Modal 
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>User Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="center-wrapper" style={{textAlign: 'center', marginTop:"1rem", marginBottom: "2rem",}}>
                    <img className="profile-pic" src={defaultPFP} alt={defaultPFP}></img>
                </div>
                <div className="container-fluid">
                    <div className="row bottom-margin-1rem">
                        <ProfileDetailText category='First Name' info={fname}/>
                        <ProfileDetailText category='Last Name' info={lname}/>
                    </div>
                    <div className="row bottom-margin-1rem">
                        <ProfileDetailText category='UserName' info={username}/>
                        <ProfileDetailText category='Email Address' info={email}/>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button  className="close-button">Edit</Button>
                <Button onClick={props.onHide} className="close-button">Close</Button>
            </Modal.Footer>
        </Modal>
         */