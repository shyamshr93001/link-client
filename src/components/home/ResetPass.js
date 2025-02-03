import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPass = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: "Passwords do not match",
                icon: "error",
            });
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/resetPassword/${token}`, { newPassword });
            alert(response.data);
            Swal.fire({
                title: "Reset Password Successfully",
                text: response.data,
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: error.response.data,
                icon: "error",
            });
        }
    };

    return (
        <div className='container'>
            <a href='/'>Home</a>
            <div className="mt-2">
                <h2>Reset Password</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" className='mt-2' type="submit">
                        Reset Password
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ResetPass;