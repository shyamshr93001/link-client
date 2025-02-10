import { GET_SUB } from "../constants/subConstants";

export const getSubAction = (subData) => {
  return {
    type: GET_SUB,
    payload: subData,
  };
};