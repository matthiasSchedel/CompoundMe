import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";

import { Button, Card, CardSection, Input, Spinner } from "./common";
import { APP_NAME } from "../../STATIC";
import { emailChanged, passwordChanged, loginUser } from "../actions";

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser(email, password);
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroudnColor: "white" }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderLoginButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={this.onLoginButtonPress.bind(this)}>Login</Button>
        );
    }

    render() {
        const { containerStyle, bigHeader } = styles;

        return (
            <View style={containerStyle}>
                <Image
                    alignSelf="center"
                    style={{ width: 150, height: 150 }}
                    borderRadius={10}
                    source={{
                        uri:
                            "https://s3-eu-west-1.amazonaws.com/compoundmelogo/Logo.png"
                    }}
                />
                <Text style={bigHeader}>{APP_NAME}</Text>
                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="test@gmail.com"
                            value={this.props.email}
                            onChangeText={this.onEmailChange.bind(this)}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Password"
                            secureTextEntry
                            placeholder="password"
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                        />
                    </CardSection>
                    {this.renderError()}
                    <CardSection>{this.renderLoginButton()}</CardSection>
                    <CardSection>{<Button>Register</Button>}</CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center"
    },
    bigHeader: {
        fontSize: 80,
        fontWeight: "bold",
        color: "gray",
        textAlign: "center",
        marginTop: -10
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: "center",
        color: "red"
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

export default connect(
    mapStateToProps,
    { emailChanged, loginUser, passwordChanged }
)(LoginForm);
