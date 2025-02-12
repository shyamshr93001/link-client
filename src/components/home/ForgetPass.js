import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgetPass } from "../../utils/userUtils";
import { forgetPassSchema } from "../../utils/schemas/userSchemas";
import { ToastContainer } from "react-toastify";

const ForgetPass = ({ showForgetModal, handleForgetPassClose }) => {
  
  const initialValues = {
    email: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    await forgetPass(values);
    setSubmitting(false)
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
            validationSchema={forgetPassSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <Button
                  variant="primary"
                  className="mt-2"
                  disabled={isSubmitting}
                  type="submit"
                >
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

export default ForgetPass;
