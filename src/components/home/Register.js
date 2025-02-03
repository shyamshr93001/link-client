import React, { useState } from 'react';
import axios from 'axios';
import './home.css'


function Register() {
    const [registerData, setRegisterData] = useState({
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        password: ''
    });

    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [con_password, setConPassword] = useState('');
    const [passNotMatch, setPassNotMatch] = useState(false);

    const handleConPassChange = (e) => {
        const { name, value } = e.target;
        setConPassword(value);
        
        setPassNotMatch(registerData.password !== value);
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

            const user = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createUser`, registerData);
            
            if (user.data == "User Exists Already") {
                alert("User already exists");
            }
            else {
                setRegisterSuccess(true)
                setTimeout(() => {
                    setRegisterSuccess(false)
                }, 2000);
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
                    <input type="text" className="col form-control" name="firstname" value={registerData.firstname} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row my-3'>
                    <label className='col-2'>Last Name:</label>
                    <input type="text" className="col form-control" name="lastname" value={registerData.lastname} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row'>
                    <label className='col-2'>Password:</label>
                    <input type="password" className="col form-control" name="password" value={registerData.password} onChange={handleRegisterChange} required />
                </div>
                <div className='form-group row my-3'>
                    <label className='col-2'>Confirm Password:</label>
                    <input type="password" className="col form-control" name="con_password" value={con_password} onChange={handleConPassChange} required />
                </div>
                {passNotMatch && <div className='text-danger'>Password do not match</div>}
                <button type="submit" className='btn btn-primary mt-2 p-3'>Register</button>
            </form>
        </div>
    );
}

export default Register;
