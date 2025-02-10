import { GET_TOPIC, ADD_TOPIC } from "../constants/topicConstants";

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
      case ADD_TOPIC:
        return {
          ...state,
          topicData: [...state.topicData, action.payload],
        };
    default:
      return state;
  }
};

export default reducer;
