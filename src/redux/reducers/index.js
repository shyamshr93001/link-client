import { combineReducers } from "redux";
import userReducers from "./userReducers";
import topicReducer from "./topicReducers";
import subscriptionReducer from "./subscriptionReducers";

const reducers = combineReducers({
  user: userReducers,
 topicReducer,
 subscriptionReducer,
});

export default reducers;
