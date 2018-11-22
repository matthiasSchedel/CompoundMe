import React, { Component } from "react";
import { Text, View, Picker, Platform } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import { Card, CardSection, Input, Button, Spinner } from "./common";
import { updateRule, amountChanged, saveRule } from "../actions";

class CreateRule extends Component {
    onAmountChange(text) {
        this.props.amountChanged(text);
    }

    onSaveButtonPress() {
        const { amount, category, ruleType } = this.props;
        this.props.saveRule(amount, category, ruleType);
    }

    renderSaveButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onSaveButtonPress.bind(this)}>
                Erstellen
            </Button>
        );
    }

    render() {
        const categories = ["Fastfood", "Supermarkt", "Kino", "Tankstelle"];

        const types = ["Fester Betrag", "Aufrunden"];

        return (
            <View>
                <Card>
                    <CardSection>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerText}>Kategorie</Text>
                            <Picker
                                value={this.props.category}
                                style={styles.picker}
                                mode={"dropdown"}
                                onValueChange={value => {
                                    this.props.updateRule({
                                        prop: "category",
                                        value
                                    });
                                }}
                                selectedValue={this.props.category}
                            >
                                {categories.map(category => (
                                    <Picker.Item
                                        key={category}
                                        label={category}
                                        value={category}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </CardSection>
                    <CardSection>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerText}>Art</Text>
                            <Picker
                                style={styles.picker}
                                mode={"dropdown"}
                                onValueChange={value =>
                                    this.props.updateRule({
                                        prop: "ruleType",
                                        value
                                    })
                                }
                                selectedValue={this.props.ruleType}
                            >
                                {types.map(type => (
                                    <Picker.Item
                                        key={type}
                                        label={type}
                                        value={type}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </CardSection>
                    <CardSection style={this.props.showAmount}>
                        <Input
                            label="Betrag (€)"
                            placeholder="10"
                            onChangeText={this.onAmountChange.bind(this)}
                            value={this.props.amount}
                        />
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>{this.renderSaveButton()}</CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    pickerText: {
        fontSize: 18,
        paddingLeft: 15,
        ...Platform.select({
            android: {
                flex: 1
            }
        })
    },
    picker: {
        ...Platform.select({
            ios: {
                flex: 1
            },
            android: {
                color: "#000",
                paddingRight: 5,
                paddingLeft: 5,
                flex: 2
            }
        })
    },
    pickerContainer: {
        ...Platform.select({
            ios: {
                flexDirection: "column"
            },
            android: {
                height: 40,
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
            }
        })
    },
    hidden: {
        display: "none"
    }
};

const mapStateToProps = state => {
    const { category, ruleType, amount, loading } = state.rule;

    let showAmount = undefined;
    if (ruleType === "Round Up") {
        showAmount = styles.hidden;
    } else {
        showAmount = undefined;
    }

    return {
        category,
        ruleType,
        showAmount,
        amount,
        loading
    };
};

export default connect(
    mapStateToProps,
    { updateRule, amountChanged, saveRule }
)(CreateRule);
