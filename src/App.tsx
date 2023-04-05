import React, { useContext } from "react";
import { ThemeContext } from "./Providers/ThemeProvider";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default React.memo(function App() {
    const { theme, themeNav } = useContext(ThemeContext);

    return(<Provider theme={theme}>
        <NavigationContainer theme={themeNav}>
            <Drawer.Navigator>
                <Drawer.Screen name={'Screen 1'} children={()=><></>} />
                <Drawer.Screen name={'Screen 2'} children={()=><></>} />
                <Drawer.Screen name={'Screen 3'} children={()=><></>} />
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>);
});