import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css'
import ForgetPass from './ForgetPass';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../utils/userUtils';
import { useDispatch } from 'react-redux';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showForgetModal, setForgetModal] = useState(false);
    const [loginFail, setLoginFail] = useState(false)
    const [loginFailMessage, setLoginFailMessage] = useState('')

    const initialValues = {
        emailOrUsername: '',
        password: ''
    };

    const validationSchema = Yup.object({
        emailOrUsername: Yup.string().required('Email or Username is required'),
        password: Yup.string().required('Password is required')
    });

    const handleForgetPassShow = () => setForgetModal(true);
    const handleForgetPassClose = () => setForgetModal(false);
    const handleLoginSubmit = async (values, { setSubmitting }) => {
        await loginUser(values, navigate, setLoginFail, setLoginFailMessage, setSubmitting, dispatch)
    }

    return (
        <div>
            <div className='myCard'>
                <h2>Login</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLoginSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='form-group row'>
                                <label className='col-4'>Email/Username:</label>
                                <Field type="text" className="col form-control" name="emailOrUsername" />
                                <ErrorMessage name="emailOrUsername" component="div" className="text-danger" />
                            </div>

                            <div className='form-group row mt-2'>
                                <label className='col-4'>Password:</label>
                                <Field type="password" className="col form-control" name="password" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <div className='row mt-2'>
                                <a href="#" className='col' onClick={handleForgetPassShow}>
                                    Forget Password
                                </a>
                                <button type="submit" className='btn btn-primary col-auto px-5' disabled={isSubmitting}>
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {loginFail && <div className="alert alert-danger mt-2" role="alert">
                    {loginFailMessage}
                </div>
                }
            </div>

            <ForgetPass showForgetModal={showForgetModal} handleForgetPassClose={handleForgetPassClose} />
        </div>
    )
}

export default Login
