import { GET_TOPIC } from "../constants/topicConstants";
import axios from "axios";

export const getTopic = (topicdata) => {
  return {
    type: GET_TOPIC,
    payload: topicdata,
  };
};

export const getData = () => async (dispatch) => {
  const data = await axios(`${process.env.REACT_APP_SERVER_URL}/getTopics`);
  dispatch(getTopic(data.data));
};
