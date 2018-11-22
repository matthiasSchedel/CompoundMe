import React from "react";
import { View } from "react-native";

const CardSection = props => {
    const { containerStyle } = styles;

    // An array of style, left styles get overwritten by right styles
    return (
        <View
            isHidden={[false, props.hide]}
            style={[containerStyle, props.style]}
        >
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        flexDirection: "row", //colum = vertical, row = horizontal
        borderColor: "#ddd",
        position: "relative"
    }
};

export { CardSection };
