import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Providers/ThemeProvider";
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerContent from "./@Drawer/Content";
import { StatusBar, StatusBarStyle } from "react-native";
import Screen1 from "./Screens/Screen1";

const Drawer = createDrawerNavigator();

const drawerOptions: DrawerNavigationOptions = {
    headerShown: false,
    drawerStyle: {
        backgroundColor: 'transparent'
    }
};

export default React.memo(function App() {
    // Context's
    const { theme, themeNav, themeStatus } = useContext(ThemeContext);
    // State's
    const [statusColor, setStatusColor] = useState(themeStatus[0].color);
    const [statusStyle, setStatusStyle] = useState<StatusBarStyle>((themeStatus[0].style == 'light')? 'light-content': 'dark-content');
    const [navColor, setNavColor] = useState(themeStatus[1].color);
    const [navStyle, setNavStyle] = useState(themeStatus[1].style);

    function _drawerContent(props: any) {
        return(<DrawerContent {...props} />);
    }

    useEffect(()=>{
        const stStyle = (themeStatus[0].style == 'light')? 'light-content': 'dark-content';
        if (statusColor !== themeStatus[0].color) setStatusColor(themeStatus[0].color);
        if (statusStyle !== stStyle) setStatusStyle(stStyle);
        if (navColor !== themeStatus[1].color) setNavColor(themeStatus[1].color);
        if (navStyle !== themeStatus[1].style) setNavStyle(themeStatus[1].style);
    }, [themeStatus]);

    /* ########## Color StatusBar/StatusNavigationBar ########## */
    //SystemNavigationBar.setNavigationColor(navColor, navStyle);
    StatusBar.setBackgroundColor(statusColor, false);
    StatusBar.setBarStyle(statusStyle, false);
    /* ######################################################### */

    return(<Provider theme={theme}>
        <NavigationContainer theme={themeNav}>
            <Drawer.Navigator drawerContent={_drawerContent} screenOptions={drawerOptions}>
                <Drawer.Screen name={'Screen 1'} component={Screen1} />
                <Drawer.Screen name={'Screen 2'} children={()=><></>} />
                <Drawer.Screen name={'Screen 3'} children={()=><></>} />
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>);
});