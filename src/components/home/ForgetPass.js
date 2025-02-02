import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'

const ForgetPass = ({ showForgetModal, handleForgetPassClose }) => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bodyData = {
                email: email
            }
            const forgotRes = await axios.post(`http://localhost:5000/forgetPassword`, bodyData);

            if (forgotRes.status === 200) {
                alert("Password reset link sent to your email");
            }
            console.log('Email:', email);
            handleForgetPassClose();
        }
        catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <>
            <Modal show={showForgetModal} onHide={handleForgetPassClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Forget Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" className='mt-2' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ForgetPass
