import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";

import LoginForm from "./components/LoginForm";
import RulesOverview from "./components/RulesOverview";

const RouterComponent = () => {
    const { navigationBarTitleStyle } = styles;

    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene
                        key="login"
                        component={LoginForm}
                        title="Login"
                        titleStyle={navigationBarTitleStyle}
                        initial
                    />
                </Scene>
                <Scene key="investing" titleStyle={navigationBarTitleStyle}>
                    <Scene
                        key="overview"
                        component={RulesOverview}
                        title="Overview"
                        initial
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    navigationBarTitleStyle: {
        flex: 1,
        textAlign: "center",
        alignSelf: "center"
    }
};

export default RouterComponent;
