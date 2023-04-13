import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import $ from 'jquery'

function LoginModal(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [fname, setFName] = useState(null)
    const [lname, setLName] = useState(null)
    const [phoneNum, setPhoneNum] = useState(null)
    const [email, setEmail] = useState(null)
    const [register, setRegister] = useState(false)
    const [justRegistered, setJustRegistered] = useState(false)
    const [errors, setErrors] = useState({'login': '', 'username': '', 'password': '', 'password2': '', 'first_name': '', 'last_name': '', 'phone_num': '', 'email': ''})

    const body = () => {
        if (register){
            return (
                <>
                <div className="container-fluid">
                    <h5 className='single-col' style={{marginBottom:'2rem'}}>
                        Username: 
                        <br></br>
                        <input type='text' id='username' onChange={event => setUsername(event.target.value)}></input>
                        <div style={{color:'red', fontSize:'0.8em'}}>{errors['username']}</div>
                    </h5>
                    <div className="row">
                        <h5 className="col">
                            Password:
                            <br></br>
                            <input type='password' id='edit-pass-input' onChange={event => setPassword(event.target.value)}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['password']}</div>
                        </h5>
                        <h5 className="col">
                            Repeat Password:
                            <br></br>
                            <input type='password' id='edit-pass-input2' onChange={event => setPassword2(event.target.value)}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['password2']}</div>
                        </h5>
                    </div>
                    <div className="row">
                        <h5 className="col">
                            First Name:
                            <br></br>
                            <input type='text' id='edit-fname-input' onChange={event => setFName(event.target.value)}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['first_name']}</div>
                        </h5>
                        <h5 className="col">
                            Last Name:
                            <br></br>
                            <input type='text' id='edit-lname-input' onChange={event => setLName(event.target.value)}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['last_name']}</div>
                        </h5>
                    </div>
                    <div className="row">
                        <h5 className="col">
                            Phone Number:
                            <br></br>
                            <input type='text' id='edit-phoneNum-input' onChange={event => setPhoneNum(event.target.value)}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['phone_num']}</div>
                        </h5>
                        <h5 className="col">
                            Email:
                            <br></br>
                            <input type='text' id='edit-email-input' onChange={event => setEmail(event.target.value)}></input>
                            <div style={{color:'red', fontSize:'0.8em'}}>{errors['email']}</div>
                        </h5>
                    </div>
                </div>
                <Button onClick={handleRegister} className="login-button btn-secondary">Register</Button>
                </>
            )
        }
        return (
            <>
            <h5>
                Username: <input type='text' id='username' onChange={event => setUsername(event.target.value)} onKeyUp={handleKeyPressLogin} style={{marginBottom:'2rem'}}></input>
                &nbsp;
                Password: <input type='password' id='password' onChange={event => setPassword(event.target.value)} onKeyUp={handleKeyPressLogin}></input>
            </h5>
            <Button onClick={handleLogin} className="login-button btn-secondary">Log In</Button>
            <div style={{color:'#04B4B4', fontSize:'1em'}}>{justRegistered ? 'Signed Up Successfully' :''}</div>
            <br></br>
            <div style={{color:'red', fontSize:'0.8em'}}>{errors['login']}</div>
            </>)
    }

    const handleKeyPressLogin = (event) =>{
        if (event.key === 'Enter'){
            handleLogin()
        }
    }

    const handleRegisterButton = () => {
        setErrors({'login': '', 'username': '', 'password': '', 'password2': '', 'first_name': '', 'last_name': '', 'phone_num': '', 'email': ''})
        register ? setRegister(false) : setRegister(true)
    }

    const handleRegister = () => {
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/signup/',
            method: 'Post',
            data: {
                username: username,
                password: password,
                password2: password2,
                email: email,
                phone_num: phoneNum,
                first_name: fname,
                last_name: lname
            },
            success: function(xhr){
                console.log(xhr)
                setErrors({'login': '', 'username': '', 'password': '', 'password2': '', 'first_name': '', 'last_name': '', 'phone_num': '', 'email': ''})
                setRegister(false)
                setJustRegistered(true)
            },
            error: function(xhr){
                console.log(xhr)
                console.log(errors)
                for (let key in errors){
                    setErrors(prev => ({...prev, [key]: xhr.responseJSON[key]}))
                }
                console.log(errors)
            },
        })
    }

    const handleLogin = () => {
        setJustRegistered(false)
        setErrors(prev => ({...prev, 'login': ''}))
        $.ajax({
            url: 'http://127.0.0.1:8000/accounts/login/',
            method: 'Post',
            data: {
                username: username,
                password: password,
            },
            success: function(xhr){
                localStorage.setItem('token', xhr.access)
                setErrors({'login': '', 'username': '', 'password': '', 'password2': '', 'first_name': '', 'last_name': '', 'phone_num': '', 'email': ''})
                props.setIsLoggedIn(true)
            },
            error: function(xhr){
                console.log(xhr)
                setErrors(prev => ({...prev, 'login': 'The username or password is incorrect'}))
            }
        })
    }

    return(
        <>
        <Modal.Header className='modal-header' closeButton>
            <Modal.Title>{register ? 'Sign Up for EasyChef' : 'Log In to EasyChef'}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="body-wrapper row" style={{marginBottom: '2rem', textAlign:'center'}}>
            <div className="login-img"></div>
            {body()}
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={() => {handleRegisterButton()}} className="footer-button btn-secondary"> {register ? 'Back to Login' : 'Sign Up'}</Button>
            <Button onClick={props.onHide} className="footer-button btn-secondary">Close</Button>
        </Modal.Footer>
        </>
    );
}

export default LoginModal;
