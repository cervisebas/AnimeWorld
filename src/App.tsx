import React, { useContext } from "react";
import { ThemeContext } from "./Providers/ThemeProvider";
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerContent from "./@Drawer/Content";

const Drawer = createDrawerNavigator();

const drawerOptions: DrawerNavigationOptions = {
    headerShown: false,
    drawerStyle: {
        backgroundColor: 'transparent'
    }
};

export default React.memo(function App() {
    const { theme, themeNav } = useContext(ThemeContext);

    function _drawerContent(props: any) {
        return(<DrawerContent {...props} />);
    }

    return(<Provider theme={theme}>
        <NavigationContainer theme={themeNav}>
            <Drawer.Navigator drawerContent={_drawerContent} screenOptions={drawerOptions}>
                <Drawer.Screen name={'Screen 1'} children={()=><></>} />
                <Drawer.Screen name={'Screen 2'} children={()=><></>} />
                <Drawer.Screen name={'Screen 3'} children={()=><></>} />
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>);
});