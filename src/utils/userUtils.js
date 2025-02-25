import { getUserAction } from "../redux/actions/userActions";
import Swal from "sweetalert2";
import { axiosInstance } from "./axiosUtils";
import {
  LOGIN_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SENT,
  PASSWORD_RESET_SENT_FAIL,
  PASSWORD_RESET_SUCCESS,
  REGISTERED_FAIL,
} from "../redux/constants/userConstants";

const handleError = (err, title) => {
  Swal.fire({ title, text: err.response?.data, icon: "error" });
};

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
    Swal.fire({ title: PASSWORD_RESET_SENT, icon: "success" });
  } catch (err) {
    handleError(PASSWORD_RESET_SENT_FAIL);
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
    return { status: 200, message: LOGIN_SUCCESS, data: res.data };
  } catch (err) {
    console.log(err);
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
    handleError(REGISTERED_FAIL);
  }
};

export const resetPass = async (values, token) => {
  try {
    await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/resetPassword/${token}`,
      { newPassword: values.newPassword }
    );
    Swal.fire({ title: PASSWORD_RESET_SUCCESS, icon: "success" });
  } catch (error) {
    handleError(PASSWORD_RESET_FAIL)
  }
};
