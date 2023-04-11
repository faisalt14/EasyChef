import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import $ from 'jquery'

function LoginModal(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const handleKeyPress = (event) =>{
        if (event.key === 'Enter'){
            handleLogin()
        }
    }

    const handleLogin = () => {
        if (username !== null && password !== null){
            $.ajax({
                url: 'http://127.0.0.1:8000/accounts/login/',
                method: 'Post',
                data: {
                    username: username,
                    password: password,
                },
                success: function(xhr){
                    localStorage.setItem('token', xhr.access)
                    props.setIsLoggedIn(true)
                },
                error: function(xhr){
                    console.log(xhr)
                }
            })
        }
    }

    return(
        <>
        <Modal.Header className='modal-header' closeButton>
            <Modal.Title>Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body className="body-wrapper row" style={{marginBottom: '2rem'}}>
            <h5>Username: 
                <input type='text' id='username' onChange={event => setUsername(event.target.value)} onKeyUp={handleKeyPress}></input>
            </h5>
            <h5>Password: 
                <input type='password' id='password' onChange={event => setPassword(event.target.value)} onKeyUp={handleKeyPress}></input>
            </h5>
            <br></br>
            <input type='submit' onClick={handleLogin} value="Log In"></input>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.onHide} className="footer-button btn-secondary">Close</Button>
        </Modal.Footer>
        </>
    );
}

export default LoginModal;
