import { GET_USER } from "../constants/userConstants";

export const user = (userdata) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER,
      payload: userdata,
    });
  };
};
