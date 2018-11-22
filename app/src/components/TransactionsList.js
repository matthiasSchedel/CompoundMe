import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

class TransactionsList extends Component {
    render() {
        const { textStyleLeft, textStyleRight, subtitleView } = styles;

        return (
            <ScrollView>
                <List>
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    22.11: Supermarkt: 22.70€
                                </Text>
                                <Text style={textStyleRight}>
                                    Investiert: 7.30€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    22.11: Fastfood: 15,50€
                                </Text>
                                <Text style={textStyleRight}>
                                    Investiert: 5€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    21.11: Supermarkt: 2€
                                </Text>
                                <Text style={textStyleRight}>
                                    Investiert: 3€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    20.11: Kino: 4.90€
                                </Text>
                                <Text style={textStyleRight}>
                                    Investiert: 5.10€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    20.11: Tankstelle: 151€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    20.11: Fastfood: 150€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    19.11: Supermarkt: 0.99€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    19.11: Tankstelle: 100€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    18.11: Kino: 9.99€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    17.11: Supermarkt: 90€
                                </Text>
                            </View>
                        }
                    />
                </List>
            </ScrollView>
        );
    }
}

const styles = {
    subtitleView: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 5
    },
    textStyleLeft: {
        flex: 6,
        fontSize: 18
    },
    textStyleRight: {
        flex: 4,
        fontSize: 18,
        float: "right",
        fontWeight: "bold"
    }
};

export default TransactionsList;
