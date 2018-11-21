import React, { Component } from "react";
import { Text, ScrollView } from "react-native";

import { CardSection, Card } from "./common/";

class TransactionsList extends Component {
    render() {
        const { textStyle } = styles;

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={textStyle}>Domino's</Text>
                        <Text style={textStyle}>110€</Text>
                        <Text style={textStyle}>22.11. 11:32</Text>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    textStyle: {
        flex: 1,
        fontSize: 18
    }
};

export default TransactionsList;
