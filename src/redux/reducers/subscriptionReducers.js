import { GET_SUB } from "../constants/subConstants";

const initialState = {
  subsData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB:
      return {
        ...state,
        subsData: [...action.payload],
      };
     
    default:
      return state;
  }
};

export default reducer;
