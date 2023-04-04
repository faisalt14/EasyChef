import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Button from 'react-bootstrap/Button'
import $ from 'jquery'
import RecipeCarousel from '../RecipeCarousel'
import HomeSearch from '../HomeSearch'

function HomePage(props) {
    const [popular, setPopular] = useState([])
    const [breakfast, setBreakfast] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])

    const update = () => {
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/recipes/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
                setPopular({popular: xhr.data.Popular})
                setBreakfast({breakfast: xhr.data.Breakfasts})
                setLunch({lunch: xhr.data.Lunches})
                setDinner({dinner: xhr.data.Dinners})
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    })

    return(
        <>
        <div>Navbar goes here</div>
        <HomeSearch />
        <div className='container-fluid carousel-table'>
            <div className='row'>
                <div className='col recipe-col'> <RecipeCarousel category='0' cardInfo={breakfast} /> </div>
                <div className='col recipe-col'> <RecipeCarousel category='1' cardInfo={lunch} /> </div>
                <div className='col recipe-col'> <RecipeCarousel category='2' cardInfo={dinner} /> </div>
            </div>
            <div className='row'>
                <div className='col recipe-col'> <RecipeCarousel category='3' cardInfo={popular} /> </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;

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