import { GET_RESOURCE } from "../constants/resourceConstants";

const initialState = {
  resourceData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESOURCE:
      return {
        ...state,
        resourceData: [...action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
