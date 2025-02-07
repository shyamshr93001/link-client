import { GET_TOPIC } from "../constants/topicConstants";

const initialState = {
  topicData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOPIC:
      return {
        ...state,
        topicData: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
