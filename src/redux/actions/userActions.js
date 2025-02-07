import { GET_USER } from "../constants/userConstants";

export const getUserAction = (userdata) => {
  return {
    type: GET_USER,
    payload: userdata,
  };
};
