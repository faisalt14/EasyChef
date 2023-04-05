import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Button from 'react-bootstrap/Button'
import $ from 'jquery'
import { ArrowRight } from 'react-bootstrap-icons'
import RecipeCard from '../../RecipeCard'

function RecipeCarousel(props) {
    
    const categoryDict = {'0': ['Breakfasts', 0],
                          '1': ['Lunches', 1],
                          '2': ['Dinners', 2],
                          '3': ['Popular', 3]}
    const [category, setCategory] = useState(categoryDict[props.category][0])
    const [categoryNum, setCategoryNum] = useState(categoryDict[props.category][1])
    const [cardInfo, setCardInfo] = useState(props.cardInfo)
    const [cards, setCards] = useState([])
    
    const update = () => {
    }

    useEffect(() =>{
        setCardInfo(props.cardInfo)
    }, [props])

    return(
        <div className='recipe-carousel'>
        <div className="recipe-carousel-header">
            <a className="nav-link btn" href="#">{category} <ArrowRight /></a>
          </div>
        <div className="recipe-carousel-cards">
            {cardInfo.map(cardInfo => (
                <RecipeCard info={cardInfo} />
            ))}
        </div>
        </div>
    );
}

export default RecipeCarousel;

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