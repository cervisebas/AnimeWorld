import React, { useContext } from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { ThemeContext } from "../Providers/ThemeProvider";

export default React.memo(function Screen1() {
    const { theme } = useContext(ThemeContext);

    return(<View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
            <Appbar.Content title={'Screen 1'} />
        </Appbar.Header>
    </View>);
});