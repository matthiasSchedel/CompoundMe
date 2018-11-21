import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import RuleReducer from "./RuleReducer";

export default combineReducers({
    auth: AuthReducer,
    rule: RuleReducer
});
