import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Modal from 'react-bootstrap/Modal'
import DetailsModal from './DetailsModal'
import LoginModal from './LoginModal'
import jwtDecode from 'jwt-decode'
import $ from 'jquery'

function ProfileModal() {
    const [modalShow, setModalShow] = useState(false);
    const [buttonName, setButtonName] = useState("Log In")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const toggle = () => {setModalShow(modalShow ? false: true)}

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token && jwtDecode(token).exp < Date.now() / 1000){
            localStorage.removeItem('token')
            setButtonName('Log In')
        }
        if (!token){
            setButtonName('Log In')
        }
        else{
            setButtonName('View Account')
        }
    }, [isLoggedIn])

    const getModal = () => {
        let token = localStorage.getItem('token')
        if (token){
            return <DetailsModal onHide={toggle} />
        }
        return <LoginModal onHide={toggle} setIsLoggedIn={setIsLoggedIn}/>
    }

    const logout = () => {
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/logout/',
            method: 'get',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            success: function(xhr){
                localStorage.removeItem('token')
                setIsLoggedIn(false)
                setButtonName('Log In')
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    }

    return(
        <>
        <button type='button' onClick={toggle}>{buttonName}</button>
        <button type='button' onClick={logout}>Log Out</button>
        <Modal 
            show={modalShow}
            onHide={toggle}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {getModal()}
        </Modal>
        </>
    );
}

export default ProfileModal;
