import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Button from 'react-bootstrap/Button'
import $ from 'jquery'

function HomeSearch(props) {

    const update = () => {
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    })

    return(
        <div>Hello world</div>
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