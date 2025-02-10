import Swal from "sweetalert2";
import { addTopic, getTopic } from "../redux/actions/topicActions";
import { axiosInstance } from "./axiosUtils";

export const getData = () => async (dispatch) => {
  try {
    const data = await axiosInstance.get("/getTopics");
    dispatch(getTopic(data.data));
  } catch (err) {
    Swal.fire({
      title: err.response?.data,
      icon: "error",
    });
  }
};

export const createTopic =
  (userData, values, setSubmitting, handleClose) => async (dispatch) => {
    try {
      values.createdBy = userData.username;
      const newTopic = await axiosInstance.post(
        `${process.env.REACT_APP_SERVER_URL}/createTopic`,
        values
      );
      dispatch(addTopic(newTopic.data));
      handleClose();
      Swal.fire({
        title: "Topic is created successfully",
        icon: "success",
      });
    } catch (err) {
      Swal.fire({
        title: err.response?.data,
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

export const updateTopic = async (
  values,
  setSubmitting,
  handleEditModalClose,
  dispatch
) => {
  try {
    console.log("val", values);
    const topic = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/updateTopic`,
      values
    );
    dispatch(getData());
    handleEditModalClose();
    Swal.fire({
      title: "Topic is update successfully",
      icon: "success",
    });
  } catch (err) {
    Swal.fire({
      title: err.response?.data,
      icon: "error",
    });
  } finally {
    setSubmitting(false);
  }
};

export const deleteTopic = async (name, dispatch) => {
  try {
    console.log(name);
    const topic = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/deleteTopic`,
      { name: name }
    );
    dispatch(getData());
    Swal.fire({
      title: "Deleted Topic Successfully",
      icon: "success",
    });
  } catch (err) {
    Swal.fire({
      title: err.response.data,
      icon: "error",
    });
  }
};
