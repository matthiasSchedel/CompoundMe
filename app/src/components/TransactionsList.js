import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

class TransactionsList extends Component {
    render() {
        const { textStyle } = styles;

        return (
            <ScrollView>
                <List>
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <Text style={textStyle}>
                                    22.11.18 - Fastfood: 400€ - Invested 5€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <Text style={textStyle}>
                                    21.11.18 - Services: 2€ - Invested 3€
                                </Text>
                            </View>
                        }
                    />
                    <ListItem
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                                <Text style={textStyle}>
                                    20.11.18 - Travel: 4.90€ - Invested 5.10€
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
    textStyle: {
        flex: 1,
        fontSize: 18
    }
};

export default TransactionsList;
