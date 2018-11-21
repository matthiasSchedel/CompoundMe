import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { Card, CardSection, Button } from "./common";

class RulesOverview extends Component {
    onButtonPress() {}

    render() {
        return (
            <ScrollView>
                <CardSection>
                    <Button
                        onPress={() => {
                            Actions.rules();
                        }}
                    >
                        Add Rule
                    </Button>
                </CardSection>

                <List>
                    <ListItem
                        onPress={() => console.log("Pressed")}
                        title="Hello World"
                    />
                </List>
            </ScrollView>
        );
    }
}

export default connect(
    null,
    {}
)(RulesOverview);
