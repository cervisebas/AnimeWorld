import React, { useContext } from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemeContext } from "../Providers/ThemeProvider";
import CustomDrawer from "../Components/CustomDrawer";
import { CommonActions, DrawerActions } from "@react-navigation/native";

export default React.memo(function DrawerContent(props: DrawerContentComponentProps) {
    // Context's
    const { theme } = useContext(ThemeContext);
    // Variables
    const borderRadius = theme.roundness * 5;

    function _renderItem({ key, name }: typeof props.state.routes[0], index: number) {
        const { title, drawerLabel, drawerIcon } = props.descriptors[key].options;
        const label = (drawerLabel !== undefined)? drawerLabel as string: (title !== undefined)? title: name;
        const active = index == props.state.index;
        function onPress() {
            return props.navigation.dispatch({
                ...(index == props.state.index)? DrawerActions.closeDrawer(): CommonActions.navigate(name),
                target: props.state.key
            });
        }
        return(<CustomDrawer.Item
            key={`drawer-${index}`}
            label={label}
            icon={drawerIcon as any}
            active={active}
            onPress={onPress}
        />);
    }

    return(<View style={[styles.content, {
        backgroundColor: theme.colors.elevation.level2,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius
    }]}>
        <ScrollView>
            {props.state.routes.map(_renderItem)}
        </ScrollView>
    </View>);
});

const styles = StyleSheet.create({
    content: {
        flex: 1,
        overflow: 'hidden'
    }
});