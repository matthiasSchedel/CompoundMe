import firebase from "firebase";
import { Actions } from "react-native-router-flux";

import {
    SAVING_NEW_RULE,
    NEW_RULE_SAVED,
    UPDATE_RULE,
    AMOUNT_CHANGED,
    NEW_INVESTMENT
} from "./types";

export const updateRule = ({ prop, value }) => {
    return {
        type: UPDATE_RULE,
        payload: { prop, value }
    };
};

export const amountChanged = text => {
    return {
        type: AMOUNT_CHANGED,
        payload: text
    };
};

export const saveRule = (amount, category, ruleType) => {
    const { currentUser } = firebase.auth();

    let amountClean = 0;
    if (amount !== "") {
        amountClean = parseInt(amount);
    }

    return dispatch => {
        dispatch({ type: SAVING_NEW_RULE });

        firebase
            .database()
            .ref(`/users/${currentUser.uid}/rules`)
            .push({
                active: true,
                ruleType,
                amount: amountClean,
                category
            })
            .then(() => {
                dispatch({ type: NEW_RULE_SAVED });
                Actions.pop().investing();
            });
    };
};

export const transactionFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/transactions`)
            .on("value", snapshot => {
                dispatch({
                    type: NEW_INVESTMENT,
                    payload: snapshot.val()
                });
            });
    };
};
