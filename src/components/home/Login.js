import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './home.css'

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        emailOrUsername: '',
        password: ''
    })

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post(`http://localhost:5000/loginUser`, loginData);
            console.log("shyam")
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user.data))
            navigate('/dashboard')
            
        }
        catch (err) {
            if (err.response.status == 400) {
                alert(err.response.data);
            }
        }

    }

    return (
        <div>
            <div className='myCard'>
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className='form-group row'>
                        <label className='col-4'>Email/Username:</label>
                        <input type="text" className="col form-control" name="emailOrUsername" value={loginData.emailOrUsername} 
                        onChange={handleLoginChange} required />
                    </div>

                    <div className='form-group row mt-2'>
                        <label className='col-4'>Password:</label>
                        <input type="password" className="col form-control" name="password" value={loginData.password} onChange={handleLoginChange} required />
                    </div>

                    <button type="submit" className='btn btn-primary mt-2'>Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login
