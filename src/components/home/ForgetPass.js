import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'


const ForgetPass = ({ showForgetModal, handleForgetPassClose }) => {

    const [email, setEmail] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bodyData = {
                email: email
            }
            setSubmitDisabled(true);
            const forgotRes = await axios.post(`http://localhost:5000/forgetPassword`, bodyData);

            if (forgotRes.status === 200) {
                Swal.fire({
                    title: "Password Reset Link Sent",
                    text: "Password reset link sent to your email",
                    icon: "success",
                });
            }
            console.log('Email:', email);
            handleForgetPassClose();
        }
        catch (err) {
            Swal.fire({
                title: err.response.data,
                icon: "error",
            });
        }

        setSubmitDisabled(false);
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
                        <Button variant="primary" className='mt-2' disabled={submitDisabled} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ForgetPass
