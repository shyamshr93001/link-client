import React, { useState } from "react";
import axios from "axios";
import "./home.css";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../utils/userUtils";

function Register() {
  const initialValues = {
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    con_password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    password: Yup.string().required("Password is required"),
    con_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    await registerUser(values, setSubmitting);
  };

  return (
    <div className="mt-4 myCard">
      <h2>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                name="firstname"
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Last Name:</label>
              <Field type="text" className="col form-control" name="lastname" />
              <ErrorMessage
                name="lastname"
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
