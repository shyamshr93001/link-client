import Swal from "sweetalert2";
import { getSubAction } from "../redux/actions/subActions";
import { axiosInstance } from "./axiosUtils";
import {
  SUBSCRIBED_SUCCESS,
  UNSUBSCRIBED_SUCCESS,
} from "../redux/constants/subConstants";
import { handleError, handleSuccess } from "./commonUtils";

export const createFormData = (topicName, username, seriousness) => ({
  topic: topicName,
  user: username,
  seriousness: seriousness,
});

export const getSubsData = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/getSubscribers");
    dispatch(getSubAction(res.data));
  } catch (err) {
    handleError(err)
  }
};

export const addToSubs = async (formData, dispatch) => {
  await Swal.fire({
    title: "Add to Subscription",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    try {
      if (result.isConfirmed) {
        const res = await axiosInstance.post("/subscribe", formData);
        dispatch(getSubsData());
        handleSuccess(SUBSCRIBED_SUCCESS);
      }
    } catch (err) {
      handleError(err)
    }
  });
};

export const unSubTopic = async (formData, dispatch) => {
  const { topic, user } = formData;
  await Swal.fire({
    title: "Remove from Subscription",
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    try {
      if (result.isConfirmed) {
        const res = await axiosInstance.delete("/unsubscribe", {
          data: { topic, user },
        });
        dispatch(getSubsData());
        handleSuccess(UNSUBSCRIBED_SUCCESS);
      }
    } catch (err) {
      handleError(err)
    }
  });
};
