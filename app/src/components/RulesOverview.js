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
            title: "Spitze - weiter so!",
            body: `Du hast gerade ${this.props.transaction.toFixed(
                2
            )} € in deinen Fonds eingezahlt`
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

    state = { isActive: false };

    setIsActive(active) {
        this.setState({ isActive: !active });
    }

    listItemStyles() {
        return this.state.isActive ? styles.active : styles.inactive;
    }

    renderRules() {
        if (this.props.showRule) {
            return (
                <ListItem
                    key={4}
                    hideChevron
                    subtitle={
                        <View style={styles.subtitleView}>
                            <ToggleSwitch
                                isOn={true}
                                onColor="green"
                                offColor="red"
                                label="Fastfood 5€ fest"
                                labelStyle={{
                                    color: "black",
                                    fontWeight: "900",
                                    fontSize: 20,
                                    paddingRight: 175
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
            );
        }
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
                                    label="Supermarkt 3€ fest"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "400",
                                        fontSize: 20,
                                        paddingRight: 150
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
                                    label="Im Kino aufrunden"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "400",
                                        fontSize: 20,
                                        paddingRight: 155
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
                                    label="Im Supermarkt aufrunden"
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "900",
                                        fontSize: 20,
                                        paddingRight: 90
                                    }}
                                    size="small"
                                    onToggle={isOn => {
                                        this.setIsActive(isOn);
                                    }}
                                />
                            </View>
                        }
                    />
                    {this.renderRules()}
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
                        Neue Regel erstellen
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
    const { transactions, showRule } = state.rule;

    let lastAmount = 0;
    let triggerNotification = false;
    Object.entries(transactions).map(transaction => {
        if (
            transaction[1].merchantCategory === "BEVESTOR" &&
            new Date(transaction[1].timestamp) >= new Date() - 120000
        ) {
            lastAmount = transaction[1].amount;
            triggerNotification = true;
        }
    });

    return { transaction: lastAmount, triggerNotification, showRule };
};

export default connect(
    mapStateToProps,
    { transactionFetch }
)(RulesOverview);
