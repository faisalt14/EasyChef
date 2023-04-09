import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../Easy Chef Logo.png'
import Card from 'react-bootstrap/Card'
import { StarFill, StarHalf, Star, Stopwatch, Bookmark } from 'react-bootstrap-icons'
import $ from 'jquery'

function LoginForm() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

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
                    console.log('success')
                    console.log(xhr)
                },
                error: function(xhr){
                    console.log(xhr)
                }
            })
        }
    }

    return(
        <h1>
            Log in please
            <div>
                Username:
                <input type='text' id='username' onChange={event => setUsername(event.target.value)}></input>
            </div>
            <div>
                Password:
                <input type='text' id='password' onChange={event => setPassword(event.target.value)}></input>
            </div>
            <div>
                <input type='submit' onClick={handleLogin}></input>
            </div>
        </h1>
    );
}

export default LoginForm;