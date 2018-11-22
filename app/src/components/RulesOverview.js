import React, { Component } from "react";
import { View, ScrollView, TextInput, Keyboard } from "react-native";
import { List, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import ToggleSwitch from "toggle-switch-react-native";
import { Notifications } from "expo";

import { CardSection, Button } from "./common";
import { transactionFetch } from "../actions";

class RulesOverview extends Component {
    onSubmit() {
        const localNotification = {
            title: "Congrats - You Invested",
            body: `You invest ${this.props.amount} keep going like that`
        };

        if (this.props.triggerNotification) {
            Notifications.presentLocalNotificationAsync(localNotification);
        }
    }

    handleNotification() {
        console.warn("ok! got your notif");
    }

    async componentDidMount() {
        Notifications.addListener(this.handleNotification);
    }

    state = { isActive: true };

    setIsActive(active) {
        this.setState({ isActive: !active });
    }

    listItemStyles() {
        return this.state.isActive ? styles.active : styles.inactive;
    }

    render() {
        return (
            <ScrollView>
                {this.props.transactionFetch()}
                {this.onSubmit()}
                <List>
                    <ListItem
                        key={1}
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <ToggleSwitch
                                    isOn={false}
                                    onColor="green"
                                    offColor="red"
                                    label="Services 3€"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "400",
                                        fontSize: 20,
                                        paddingRight: 215
                                    }}
                                    size="small"
                                    onToggle={() => {
                                        {
                                        }
                                    }}
                                />
                            </View>
                        }
                    />
                    <ListItem
                        key={2}
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <ToggleSwitch
                                    isOn={false}
                                    onColor="green"
                                    offColor="red"
                                    label="Round Up Digital Goods"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "400",
                                        fontSize: 20,
                                        paddingRight: 110
                                    }}
                                    size="small"
                                    onToggle={() => {
                                        {
                                        }
                                    }}
                                />
                            </View>
                        }
                    />
                    <ListItem
                        key={3}
                        onPress={() => this.setIsActive(this.state.isActive)}
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <ToggleSwitch
                                    isOn={this.state.isActive}
                                    onColor="green"
                                    offColor="red"
                                    label="Round Up Travel"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "900",
                                        fontSize: 20,
                                        paddingRight: 170
                                    }}
                                    size="small"
                                    onToggle={isOn => {
                                        this.setIsActive(isOn);
                                    }}
                                />
                            </View>
                        }
                    />
                    <ListItem
                        key={4}
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <ToggleSwitch
                                    isOn={true}
                                    onColor="green"
                                    offColor="red"
                                    label="Fastfood 5€"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "900",
                                        fontSize: 20,
                                        paddingRight: 212
                                    }}
                                    size="small"
                                    onToggle={() => {
                                        {
                                        }
                                    }}
                                />
                            </View>
                        }
                    />
                </List>
                <CardSection
                    style={{
                        marginTop: 350,
                        backgroundColor: "#e8e8e8",
                        borderBottomWidth: 0
                    }}
                >
                    <Button
                        onPress={() => {
                            Actions.rules();
                        }}
                    >
                        Add a Rule
                    </Button>
                </CardSection>
            </ScrollView>
        );
    }
}

const styles = {
    active: {
        backgroundColor: "#42f47a"
    },
    subtitleViewActive: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 5
    },
    subtitleText: {
        fontSize: 20
    },
    inactive: {
        backgroundColor: "#f44242"
    }
};

const mapStateToProps = state => {
    const { amount } = state.rule;

    let lastAmount = 0;
    let triggerNotification = false;
    Object.entries(amount).map(item => {
        if (
            item[1].merchantCategory === "BEVESTOR" &&
            new Date(item[1].timestamp) >= new Date() - 120000
        ) {
            lastAmount = item[1].amount;
            triggerNotification = true;
        }
    });

    return { amount: lastAmount, triggerNotification };
};

export default connect(
    mapStateToProps,
    { transactionFetch }
)(RulesOverview);

// && new Date(item[1].timestamp) >= new Date() - 120000
