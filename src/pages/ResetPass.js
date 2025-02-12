import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPass } from "../utils/userUtils";
import { resetPassSchema } from "../utils/schemas/userSchemas";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await resetPass(values, token);
    }
    setSubmitting(false);
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
          validationSchema={resetPassSchema}
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
