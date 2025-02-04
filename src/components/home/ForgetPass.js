import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const ForgetPass = ({ showForgetModal, handleForgetPassClose }) => {
    const initialValues = {
        email: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required')
    });
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/forgotPassword`, values);
            Swal.fire({
                title: 'Password reset email sent',
                icon: 'success',
            });
        } catch (err) {
            Swal.fire({
                title: 'Error sending email',
                text: err.response.data,
                icon: 'error',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Modal show={showForgetModal} onHide={handleForgetPassClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Forget Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='form-group'>
                                    <label htmlFor="email">Email address</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <Button variant="primary" className='mt-2' disabled={isSubmitting} type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ForgetPass
