import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "./Providers/ThemeProvider";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default React.memo(function App() {
    const { theme } = useContext(ThemeContext);

    return(<View style={{ flex: 1 }}>
        
    </View>);
});