import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import $ from 'jquery'
import defaultPFP from '../../../../default.png'
import { PencilSquare } from 'react-bootstrap-icons'

function DetailsModal(props) {
    const [fname, setFName] = useState("First Name");
    const [lname, setLName] = useState("Last Name");
    const [username, setUsername] = useState("Username");
    const [email, setEmail] = useState("Email");
    const [phoneNum, setPhoneNum] = useState("Phone Number");
    const [pfp, setPfp] = useState(defaultPFP);
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({'first_name': '', 'last_name': '', 'phone_num': '', 'email': '', 'password': ''})
    const [pfpPreview, setPfpPreview] = useState(null)

    const body = () => {
        if (editMode){
            return (
                <>
                <div className="center-wrapper">
                    <h2>{username}</h2>
                    <img className="profile-pic" src={pfpPreview ? pfpPreview : pfp} alt={defaultPFP}></img>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <h5 className="col">
                            First Name:
                            <br></br>
                            <input type='text' id='edit-fname-input' defaultValue={fname === 'None' ? '' : fname}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['first_name']}</div>
                        </h5>
                        <h5 className="col">
                            Last Name:
                            <br></br>
                            <input type='text' id='edit-lname-input' defaultValue={lname === 'None' ? '' : lname}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['last_name']}</div>
                        </h5>
                    </div>
                    <div className="row">
                        <h5 className="col">
                            Phone Number:
                            <br></br>
                            <input type='text' id='edit-phoneNum-input' defaultValue={phoneNum === 'None' ? '' : phoneNum}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['phone_num']}</div>
                        </h5>
                        <h5 className="col">
                            Email:
                            <br></br>
                            <input type='text' id='edit-email-input' defaultValue={email === 'None' ? '' : email}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['email']}</div>
                        </h5>
                    </div>
                    <div className="row">
                        <h5 className="col">
                            Password:
                            <br></br>
                            <input type='password' id='edit-pass-input'></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['password']}</div>
                        </h5>
                        <h5 className="col">
                            Repeat Password:
                            <br></br>
                            <input type='password' id='edit-pass-input2'></input>
                        </h5>
                    </div>
                </div>
                </>
            )
        }

        return (
            <>
            <div className="center-wrapper">
                <h2>{username}</h2>
                <img className="profile-pic" src={pfp} alt={defaultPFP}></img>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <h5 className="col">
                        First Name:
                        <div className="user-info">{fname}</div>
                    </h5>
                    <h5 className="col">
                        Last Name:
                        <div className="user-info">{lname}</div>
                    </h5>
                </div>
                <div className="row">
                    <h5 className="col">
                        Phone Number:
                        <div className="user-info">{phoneNum}</div>
                    </h5>
                    <h5 className="col">
                        Email:
                        <div className="user-info">{email}</div>
                    </h5>
                </div>
            </div>
            </>)
    }

    const editPfp = () => {
        console.log(document.getElementById('pfp-upload').files[0])
        if (document.getElementById('pfp-upload').files[0]){
            console.log(URL.createObjectURL(document.getElementById('pfp-upload').files[0]))
            setPfpPreview(URL.createObjectURL(document.getElementById('pfp-upload').files[0]))
        }
    }

    const handleEditClick = () => {
        editMode ? trySave() : setEditMode(true)
    }

    const trySave = () => {
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/profile/edit/',
            method: 'Patch',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            data: {
                'first_name': document.getElementById('edit-fname-input').value,
                'last_name': document.getElementById('edit-lname-input').value,
                'phone_num': document.getElementById('edit-phoneNum-input').value,
                'email': document.getElementById('edit-email-input').value,
                'password': document.getElementById('edit-pass-input').value,
                'password2': document.getElementById('edit-pass-input2').value,
                'avatar': pfpPreview,
            },
            success: function(xhr){
                setUsername(xhr.username);
                setFName(xhr.first_name ? xhr.first_name : 'None');
                setLName(xhr.last_name ? xhr.last_name : 'None');
                setEmail(xhr.email ? xhr.email : 'None');
                setPhoneNum(xhr.phone_num ? xhr.phone_num : 'None');
                setPfp(xhr.avatar);
                
                setEditMode(false)
            },
            error: function(xhr){
                for (let key in errors){
                    setErrors(prev => ({...prev, [key]: xhr.responseJSON[key]}))
                }
            }
        })
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/profile/',
            method: 'Get',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success: function(xhr){
                setUsername(xhr.username);
                setFName(xhr.first_name ? xhr.first_name : 'None');
                setLName(xhr.last_name ? xhr.last_name : 'None');
                setEmail(xhr.email ? xhr.email : 'None');
                setPhoneNum(xhr.phone_num ? xhr.phone_num : 'None');
                setPfp(xhr.avatar);
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    })

    return(
        <>
        <Modal.Header className='modal-header' closeButton>
            <Modal.Title>{editMode ? 'Edit Your Information' : 'Your Account'}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="body-wrapper">
            {body()}
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={() => {handleEditClick()}} className="footer-button btn-secondary"> {editMode ? 'Save Changes' : 'Edit'}</Button>
            <Button onClick={props.onHide} className="footer-button btn-secondary">{editMode ? 'Cancel' : 'Close'}</Button>
        </Modal.Footer>
        </>
    );
}

export default DetailsModal;
