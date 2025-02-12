import Swal from "sweetalert2";
import { addTopic, getTopic } from "../redux/actions/topicActions";
import { axiosInstance } from "./axiosUtils";
import { toast } from "react-toastify";

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
    toast.success("Topic is created successfully");
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
    toast.success("Topic is updated successfully");
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
    toast.success("Topic deleted Successfully");
  } catch (err) {
    Swal.fire({ title: err.response.data, icon: "error" });
  }
};
