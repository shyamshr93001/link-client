import { GET_USER } from "../constants/userConstants";
const initialState = {
  userData: {
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  },
};
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
