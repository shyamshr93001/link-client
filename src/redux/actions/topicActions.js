import { GET_TOPIC, ADD_TOPIC } from "../constants/topicConstants";

export const getTopic = (topicData) => {
  return {
    type: GET_TOPIC,
    payload: topicData,
  };
};

export const addTopic = (newTopic) => {
  return {
    type: ADD_TOPIC,
    payload: newTopic,
  };
};
