import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPass } from "../../utils/userUtils";

const ResetPass = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    await resetPass(values, setSubmitting, token);
  };

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Invalid Token or Not found",
        text: "Token is invalid",
        icon: "error",
      });
    }
  }, []);

  return (
    <div className="container">
      <a href="/">Home</a>
      <div className="mt-2">
        <h2>Reset Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <Field
                  type="password"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isSubmitting}
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPass;
