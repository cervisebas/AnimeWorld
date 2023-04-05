import React, { useContext } from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemeContext } from "../Providers/ThemeProvider";

export default React.memo(function DrawerContent(props: DrawerContentComponentProps) {
    const { theme } = useContext(ThemeContext);

    const borderRadius = theme.roundness * 5;

    return(<View style={[styles.content, {
        backgroundColor: theme.colors.elevation.level2,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius
    }]}>
        <ScrollView>
            
        </ScrollView>
    </View>);
});

const styles = StyleSheet.create({
    content: {
        flex: 1,
        overflow: 'hidden',
    }
});