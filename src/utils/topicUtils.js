import Swal from "sweetalert2";
import { addTopic, getTopic } from "../redux/actions/topicActions";
import { axiosInstance } from "./axiosUtils";
import { toast } from "react-toastify";
import {
  TOPIC_CREATED_SUCCESS,
  TOPIC_DELETED_SUCCESS,
  TOPIC_UPDATED_SUCCESS,
} from "../redux/constants/topicConstants";
import { handleError, handleSuccess } from "./commonUtils";

export const getData = () => async (dispatch) => {
  try {
    const data = await axiosInstance.get("/getTopics");
    dispatch(getTopic(data.data));
  } catch (err) {
    handleError(err);
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
    handleSuccess(TOPIC_CREATED_SUCCESS);
  } catch (err) {
    handleError(err);
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
    handleSuccess(TOPIC_UPDATED_SUCCESS);
  } catch (err) {
    handleError(err);
  }
};

export const deleteTopic = async (name, dispatch) => {
  try {
    const topic = await axiosInstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/deleteTopic`,
      { data: { name } }
    );
    dispatch(getData());
    handleSuccess(TOPIC_DELETED_SUCCESS);
  } catch (err) {
    handleError(err);
  }
};
