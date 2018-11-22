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
                                    22.11.18 - Travel: 22.70€
                                </Text>
                                <Text style={textStyleRight}>
                                    Invested 7.30€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    22.11.18 - Fastfood: 15,50€
                                </Text>
                                <Text style={textStyleRight}>Invested 5€</Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    21.11.18 - Services: 2€
                                </Text>
                                <Text style={textStyleRight}>Invested 3€</Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    20.11.18 - Travel: 4.90€
                                </Text>
                                <Text style={textStyleRight}>
                                    Invested 5.10€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    20.11.18 - Digital Goods: 151€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    20.11.18 - Fastfood: 150€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    19.11.18 - Digital Goods: 0.99€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    19.11.18 - Recreation: 100€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    18.11.18 - Stores: 9.99€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={subtitleView}>
                                <Text style={textStyleLeft}>
                                    17.11.18 - Restaurant: 90€
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
        flex: 2,
        fontSize: 18
    },
    textStyleRight: {
        flex: 1,
        fontSize: 18,
        float: "right",
        fontWeight: "bold"
    }
};

export default TransactionsList;
