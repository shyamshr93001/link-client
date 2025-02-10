import { getUserAction } from "../redux/actions/userActions";
import axios from "axios";
import Swal from "sweetalert2";
import { axiosInstance } from "./axiosUtils";

export const getUser =
  (navigate = null) =>
  (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null && navigate != null) {
      Swal.fire({
        title: "Not Logged in",
        icon: "error",
      });
      navigate("/");
      return;
    }
    console.log("Logged in:", user);
    dispatch(getUserAction(user));
  };

export const forgetPass = async (values, setSubmitting) => {
  try {
    await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/forgotPassword`,
      values
    );
    Swal.fire({
      title: "Password reset email sent",
      icon: "success",
    });
  } catch (err) {
    Swal.fire({
      title: "Error sending email",
      text: err.response.data,
      icon: "error",
    });
  } finally {
    setSubmitting(false);
  }
};

export const loginUser = async (
  values,
  navigate,
  setLoginFail,
  setLoginFailMessage,
  setSubmitting,
  dispatch
) => {
  try {
    const user = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/loginUser`,
      values
    );
    localStorage.setItem("user", JSON.stringify(user.data.data));
    localStorage.setItem("token", JSON.stringify(user.data.token));
    dispatch(getUser());
    navigate("/dashboard");
  } catch (err) {
    if (err.response.status === 400) {
      setLoginFail(true);
      setLoginFailMessage(err.response.data);
    } else {
      Swal.fire({
        title: "Login Error",
        text: err.response.data,
        icon: "error",
      });
    }
  } finally {
    setSubmitting(false);
  }
};

export const registerUser = async (values, setSubmitting) => {
  try {
    const user = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/createUser`,
      values
    );

    if (user.data === "User Exists Already") {
      Swal.fire({
        title: "User Exists Already",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Registered Successfully",
        text: "User is registered successfully",
        icon: "success",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Registration Error",
      text: err.response.data,
      icon: "error",
    });
  } finally {
    setSubmitting(false);
  }
};

export const resetPass = async (values, setSubmitting, token) => {
  if (values.newPassword !== values.confirmPassword) {
    Swal.fire({
      title: "Passwords do not match",
      icon: "error",
    });
    return;
  }
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/resetPassword/${token}`,
      { newPassword: values.newPassword }
    );
    Swal.fire({
      title: "Password reset successful",
      icon: "success",
    });
  } catch (error) {
    Swal.fire({
      title: "Error resetting password",
      text: error.response?.data,
      icon: "error",
    });
  } finally {
    setSubmitting(false);
  }
};
