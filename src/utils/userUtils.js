import {getUserAction} from "../redux/actions/userActions";

export const getUser = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("usersad shyam", user)
  dispatch(getUserAction(user));
};
