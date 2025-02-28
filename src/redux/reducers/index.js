import { combineReducers } from "redux";
import userReducers from "./userReducers";
import topicReducer from "./topicReducers";
import subscriptionReducer from "./subscriptionReducers";
import resourceReducer from "./resourceReducers";

const reducers = combineReducers({
  user: userReducers,
  topicReducer,
  subscriptionReducer,
  resourceReducer,
});

export default reducers;
