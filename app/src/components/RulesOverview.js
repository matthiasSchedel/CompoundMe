import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";

import { Card, CardSection, Button } from "./common";

class RulesOverview extends Component {
    onButtonPress() {}

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Add Rule
                        </Button>
                    </CardSection>
                </Card>
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

export default RulesOverview;
