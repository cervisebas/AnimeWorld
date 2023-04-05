import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "./Providers/ThemeProvider";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default React.memo(function App() {
    const { theme } = useContext(ThemeContext);

    return(<View style={{ flex: 1 }}>
        <Drawer.Navigator>
            <Drawer.Screen name={'Screen 1'} children={()=><></>} />
            <Drawer.Screen name={'Screen 2'} children={()=><></>} />
            <Drawer.Screen name={'Screen 3'} children={()=><></>} />
        </Drawer.Navigator>
    </View>);
});