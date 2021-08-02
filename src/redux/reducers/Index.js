import Auth from "./Auth";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: Auth,
});

export default rootReducer;
