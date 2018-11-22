import _ from "lodash";

import {
    NEW_RULE_SAVED,
    SAVING_NEW_RULE,
    UPDATE_RULE,
    AMOUNT_CHANGED,
    NEW_INVESTMENT
} from "../actions/types";

const INITIAL_SATE = {
    active: true,
    ruleType: "Fester Betrag",
    showAmount: undefined,
    amount: "",
    category: "Fastfood",
    loading: false,
    transactions: "",
    showRule: false
};

export default (RuleReducer = (state = INITIAL_SATE, action) => {
    switch (action.type) {
        case UPDATE_RULE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case AMOUNT_CHANGED:
            return { ...state, amount: action.payload };
        case SAVING_NEW_RULE:
            return { ...state, loading: true };
        case NEW_RULE_SAVED:
            return { ...state, ...INITIAL_SATE, showRule: true };
        case NEW_INVESTMENT:
            return {
                ...state,
                transactions: action.payload
            };
        default:
            return state;
    }
});
