import React, { Component } from "react";
import firebase from "firebase";

import Router from "./src/Router";
export default class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyCi3x67SV178IUIAETk8H6AqTIZVOfZKEE",
            authDomain: "symbioticon2018-e2f17.firebaseapp.com",
            databaseURL: "https://symbioticon2018-e2f17.firebaseio.com",
            projectId: "symbioticon2018-e2f17",
            storageBucket: "symbioticon2018-e2f17.appspot.com",
            messagingSenderId: "1005305567833"
        };

        firebase.initializeApp(config);
    }

    render() {
        return <Router />;
    }
}
