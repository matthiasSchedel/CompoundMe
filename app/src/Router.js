import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import LoginForm from "./components/LoginForm";
import RulesOverview from "./components/RulesOverview";
import TransactionsList from "./components/TransactionsList";
import CreateRule from "./components/CreateRule";

const IconView = ({ title, focused }) => {
    const color = focused ? "#f44242" : "#517fa4";
    let image = "";
    let size = "";

    switch (title) {
        case "Rules Overview":
            image = "home";
            size = 36;
            break;
        case "Investments":
            image = "trending-up";
            size = 36;
            break;
        case "Transactions":
            image = "inbox";
            size = 32;
            break;
    }

    return (
        <View>
            <Icon name={image} size={size} type="material" color={color} />
        </View>
    );
};

const RouterComponent = () => {
    const { navigationBarTitleStyle } = styles;

    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar>
                    <Scene
                        key="login"
                        component={LoginForm}
                        title="Login"
                        titleStyle={navigationBarTitleStyle}
                        hideNavBar
                        initial
                    />
                </Scene>
                <Scene
                    key="investing"
                    titleStyle={navigationBarTitleStyle}
                    tabs={true}
                >
                    <Scene
                        key="RulesOverview"
                        component={RulesOverview}
                        icon={IconView}
                        initial
                        title="Rules Overview"
                    />

                    <Scene
                        key="Investments"
                        component={RulesOverview}
                        icon={IconView}
                        title="Investments"
                    />

                    <Scene
                        key="Transactions"
                        component={TransactionsList}
                        icon={IconView}
                        title="Transactions"
                    />
                </Scene>

                <Scene key="rules" titleStyle={navigationBarTitleStyle}>
                    <Scene
                        key="createNewRule"
                        component={CreateRule}
                        title="Create New Rule"
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
