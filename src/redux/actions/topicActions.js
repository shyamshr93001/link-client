import { GET_TOPIC } from "../constants/topicConstants";

export const getTopic = (topicData) => {
  return {
    type: GET_TOPIC,
    payload: topicData,
  };
};
