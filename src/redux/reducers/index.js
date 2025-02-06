import { combineReducers } from "redux";
import userReducers from "./userReducers";
import topicReducer from "./topicReducers";

const reducers = combineReducers({
  user: userReducers,
 topicReducer,
});

export default reducers;
