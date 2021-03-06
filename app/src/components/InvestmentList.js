import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Divider } from "react-native-elements";

class InvestementList extends Component {
    render() {
        return (
            <View style={{ height: "100%", backgroundColor: "#ffffff" }}>
                <Divider style={{ height: 30, backgroundColor: "#ffffff" }} />
                <Text
                    style={{
                        height: 60,
                        fontSize: 18,
                        backgroundColor: "#ffffff"
                    }}
                >
                    {" "}
                    Heute investiert:
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            backgroundColor: "#ffffff"
                        }}
                    >
                        {" "}
                        12,30 €
                    </Text>
                </Text>
                <Text
                    style={{
                        height: 60,
                        fontSize: 18,
                        backgroundColor: "#ffffff"
                    }}
                >
                    {" "}
                    Diese Woche investiert:
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            backgroundColor: "#ffffff"
                        }}
                    >
                        {" "}
                        13,10 €
                    </Text>
                </Text>

                <Text
                    style={{
                        height: 150,
                        fontSize: 18,
                        backgroundColor: "#ffffff"
                    }}
                >
                    {" "}
                    Diesen Monat investiert:
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            backgroundColor: "#ffffff"
                        }}
                    >
                        {" "}
                        192,00€
                    </Text>
                </Text>
                <Divider style={{ height: 10, backgroundColor: "#eeeeee" }} />
                <Divider style={{ height: 10, backgroundColor: "#ffffff" }} />
                <Text
                    style={{
                        height: 30,
                        fontSize: 18,
                        backgroundColor: "#ffffff"
                    }}
                >
                    {" "}
                    Vorhersage für 2019:
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            backgroundColor: "#ffffff"
                        }}
                    >
                        {" "}
                        2.477 €{" "}
                    </Text>
                </Text>
                <Divider style={{ height: 3, backgroundColor: "black" }} />
                <Image
                    style={{ height: 250 }}
                    source={{
                        uri:
                            "https://media.ycharts.com/charts/3197d83ae3faa352dead1207565b4c44.png"
                    }}
                />
            </View>
        );
    }
}

export default InvestementList;
