import { GET_TOPIC } from "../constants/topicConstants";

const initialState = {
  topicData: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === GET_TOPIC) {
    return {
      ...state,
      topicData: [...action.payload],
    };
  }
  return state;
};

export default reducer;
