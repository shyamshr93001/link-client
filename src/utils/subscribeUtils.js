import Swal from "sweetalert2";
import { getSubAction } from "../redux/actions/subActions";
import { axiosInstance } from "./axiosUtils";

export const getSubsData = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/getSubscribers");
    dispatch(getSubAction(res.data));
  } catch (err) {
    Swal.fire({
      title: err.response?.data,
      icon: "error",
    });
  }
};

export const addToSubs = async (formData, dispatch) => {
  Swal.fire({
    title: "Add to Subscription",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    try {
      if (result.isConfirmed) {
        const res = await axiosInstance.post("/subscribe", formData);
        dispatch(getSubsData());
        Swal.fire("Subscribed!", "", "success");
      }
    } catch (err) {
      Swal.fire({
        title: err.response?.data,
        icon: "error",
      });
    }
  });
};

export const unsubTopic = async (formData, dispatch) => {
    Swal.fire({
      title: "Remove from Subscription",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const res = await axiosInstance.post("/unsubscribe", formData);
          dispatch(getSubsData());
          Swal.fire("Unsubscribed!", "", "success");
        }
      } catch (err) {
        Swal.fire({
          title: err.response?.data,
          icon: "error",
        });
      }
    });
  };
