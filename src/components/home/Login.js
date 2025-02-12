import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import ForgetPass from "./ForgetPass";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginUser } from "../../utils/userUtils";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../utils/schemas/userSchemas";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showForgetModal, setForgetModal] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loginFailMessage, setLoginFailMessage] = useState("");

  const initialValues = {
    emailOrUsername: "",
    password: "",
  };

  const handleForgetPassShow = () => setForgetModal(true);
  const handleForgetPassClose = () => setForgetModal(false);
  const handleLoginSubmit = async (values, { setSubmitting }) => {
    const res = await loginUser(values, navigate, dispatch);
    switch (res.status) {
      case 400:
        setLoginFail(true);
        setLoginFailMessage(res.data);
        
        break;
      case 200:
        navigate("/dashboard");
        break;
      default:
        break;
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="myCard">
        <h2>Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group row">
                <label className="col-4">Email/Username:</label>
                <Field
                  type="text"
                  className="col form-control"
                  name="emailOrUsername"
                />
                <ErrorMessage
                  name="emailOrUsername"
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
              <div className="row mt-2">
                <a href="#" className="col" onClick={handleForgetPassShow}>
                  Forget Password
                </a>
                <button
                  type="submit"
                  className="btn btn-primary col-auto px-5"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {loginFail && (
          <div className="alert alert-danger mt-2" role="alert">
            {loginFailMessage}
          </div>
        )}
      </div>

      <ForgetPass
        showForgetModal={showForgetModal}
        handleForgetPassClose={handleForgetPassClose}
      />
    </div>
  );
}

export default Login;
