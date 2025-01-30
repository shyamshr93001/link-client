import React, { useState } from 'react';
import axios from 'axios';
import './home.css'


function Register() {
    const [registerData, setRegisterData] = useState({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: ''
    });

    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [con_password, setConPassword] = useState('');

    const handleConPassChange = (e) => {
        const { name, value } = e.target;
        setConPassword(value);
    }

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (registerData.password === con_password) {
            const user = await axios.post(`http://localhost:5000/getUser`, registerData);
            console.log("shyamasda")
            console.log(user)
            if (user.data != '') {
                alert("User already exists");
            }
            else {
                const sendDataReq = await axios.post(`http://localhost:5000/createUser`, registerData);
                setRegisterSuccess(true)
                setTimeout(() => {
                    setRegisterSuccess(false)
                }, 1000);
            }
        }
        else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className='mt-4 myCard'>
            <h2>Register</h2>
            {registerSuccess && <div className="alert alert-success" role="alert">
                Register Successfully
            </div>
            }
            <form onSubmit={handleRegisterSubmit}>
                <div className='form-group row'>
                    <label className='col-2'>Email:</label>
                    <input type="email" className="col form-control" name="email" value={registerData.email} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row my-3'>
                    <label className='col-2'>Username:</label>
                    <input type="text" className="col form-control" name="username" value={registerData.username} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row'>
                    <label className='col-2'>First Name:</label>
                    <input type="text" className="col form-control" name="firstName" value={registerData.firstName} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row my-3'>
                    <label className='col-2'>Last Name:</label>
                    <input type="text" className="col form-control" name="lastName" value={registerData.lastName} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row'>
                    <label className='col-2'>Password:</label>
                    <input type="password" className="col form-control" name="password" value={registerData.password} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row my-3'>
                    <label className='col-2'>Confirm Password:</label>
                    <input type="password" className="col form-control" name="con_password" value={con_password} onChange={handleConPassChange} required />
                </div>
                <button type="submit" className='btn btn-primary'>Register</button>
            </form>
        </div>
    );
}

export default Register;
