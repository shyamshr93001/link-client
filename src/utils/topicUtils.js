import Swal from "sweetalert2";
import { addTopic, getTopic } from "../redux/actions/topicActions";
import { axiosInstance } from "./axiosUtils";
import { toast } from "react-toastify";
import { TOPIC_CREATED_SUCCESS, TOPIC_DELETED_SUCCESS, TOPIC_UPDATED_SUCCESS } from "../redux/constants/topicConstants";

export const getData = () => async (dispatch) => {
  try {
    const data = await axiosInstance.get("/getTopics");
    dispatch(getTopic(data.data));
  } catch (err) {
    Swal.fire({ title: err.response?.data, icon: "error" });
  }
};

export const createTopic = (userData, values) => async (dispatch) => {
  try {
    values.createdBy = userData.username;
    const newTopic = await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/createTopic`,
      values
    );
    dispatch(addTopic(newTopic.data));
    toast.success(TOPIC_CREATED_SUCCESS);
  } catch (err) {
    Swal.fire({ title: err.response?.data, icon: "error" });
  }
};

export const updateTopic = async (values, dispatch) => {
  try {
    console.log("val", values);
    const topic = await axiosInstance.put(
      `${process.env.REACT_APP_SERVER_URL}/updateTopic`,
      values
    );
    dispatch(getData());
    toast.success(TOPIC_UPDATED_SUCCESS);
  } catch (err) {
    Swal.fire({ title: err.response?.data, icon: "error" });
  }
};

export const deleteTopic = async (name, dispatch) => {
  try {
    const topic = await axiosInstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/deleteTopic`,
      { data: { name } }
    );
    dispatch(getData());
    toast.success(TOPIC_DELETED_SUCCESS);
  } catch (err) {
    Swal.fire({ title: err.response.data, icon: "error" });
  }
};
