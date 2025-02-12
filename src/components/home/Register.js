import React, { useState } from "react";
import "./home.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUser } from "../../utils/userUtils";
import { registerSchema } from "../../utils/schemas/userSchemas";

function Register() {
  const initialValues = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    con_password: "",
  };

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    await registerUser(values);
    setSubmitting(false)
  };

  return (
    <div className="mt-4 myCard">
      <h2>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleRegisterSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group row">
              <label className="col-4">Email:</label>
              <Field type="email" className="col form-control" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Username:</label>
              <Field type="text" className="col form-control" name="username" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">First Name:</label>
              <Field
                type="text"
                className="col form-control"
                name="firstName"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Last Name:</label>
              <Field type="text" className="col form-control" name="lastName" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Password:</label>
              <Field
                type="password"
                className="col form-control"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Confirm Password:</label>
              <Field
                type="password"
                className="col form-control"
                name="con_password"
              />
              <ErrorMessage
                name="con_password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="row mt-2">
              <button
                type="submit"
                className="btn btn-primary col-auto px-5"
                disabled={isSubmitting}
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
