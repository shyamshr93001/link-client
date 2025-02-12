import { getUserAction } from "../redux/actions/userActions";
import Swal from "sweetalert2";
import { axiosInstance } from "./axiosUtils";

export const getUser =
  (navigate = null) =>
  (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null && navigate != null) {
      Swal.fire({ title: "Not Logged in", icon: "error" });
      navigate("/");
      return;
    }
    console.log("Logged in:", user);
    dispatch(getUserAction(user));
  };

export const forgetPass = async (values) => {
  try {
    await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/forgetPass`,
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
  }
};

export const loginUser = async (values, dispatch) => {
  try {
    const res = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/loginUser`,
      values
    );
    localStorage.setItem("user", JSON.stringify(res.data.data));
    localStorage.setItem("token", JSON.stringify(res.data.token));
    dispatch(getUser());
    return { status: 200, message: "Success", data: res.data };
  } catch (err) {
    console.log(err)
    return err.response;
  }
};

export const registerUser = async (values) => {
  try {
    const user = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/createUser`,
      values
    );
    Swal.fire({ title: user.data, icon: "success" });
  } catch (err) {
    Swal.fire({
      title: "Registration Error",
      text: err.response.data,
      icon: "error",
    });
  }
};

export const resetPass = async (values, token) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/resetPassword/${token}`,
      { newPassword: values.newPassword }
    );
    Swal.fire({ title: "Password reset successful", icon: "success" });
  } catch (error) {
    Swal.fire({
      title: "Error resetting password",
      text: error.response?.data,
      icon: "error",
    });
  }
};
