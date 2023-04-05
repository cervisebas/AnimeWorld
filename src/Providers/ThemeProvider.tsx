import React, { useState } from "react";
import { createContext } from "react";
import { MD3DarkTheme, MD3Theme } from "react-native-paper";
import { Theme as NavTheme, DarkTheme as NavThemeDark } from "@react-navigation/native";
import { ThemeDark, ThemeNavigationDark } from "../Scripts/Theme";


export type ThemeStatus = {
    color: string;
    style: 'light' | 'dark';
};

const defaultThemeStatus: ThemeStatus = {
    color: ThemeDark.colors.background,
    style: 'light'
};

export type ThemeContextType = {
    theme: MD3Theme;
    themeNav: NavTheme;
    themeStatus: ThemeStatus[];
    setTheme: (_props: 'normal' | 'dark')=>void;
    setThemeStatus: (newTheme: (ThemeStatus | undefined)[])=>void;
    updateThemeStatusFotTheme: ()=>void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: MD3DarkTheme,
    themeNav: NavThemeDark,
    themeStatus: [defaultThemeStatus, defaultThemeStatus],
    setTheme: (_props)=>{},
    setThemeStatus: ()=>{},
    updateThemeStatusFotTheme: ()=>{}
});

export default React.memo(function ThemeProvider(props: any) {
    const [theme, _setTheme] = useState(ThemeDark);
    const [themeNav, _setThemeNav] = useState(ThemeNavigationDark);
    const [themeStatus, _setThemeStatus] = useState([defaultThemeStatus, defaultThemeStatus]);

    function check(compare: ThemeStatus[]): boolean {
        const theme0c = themeStatus[0].color, theme0s = themeStatus[0].style;
        const theme1c = themeStatus[1].color, theme1s = themeStatus[1].style;
        const aTheme0c = compare[0].color, aTheme0s = compare[0].style;
        const aTheme1c = compare[1].color, aTheme1s = compare[1].style;
        return (theme0c == aTheme0c && theme1c == aTheme1c && theme0s == aTheme0s && theme1s == aTheme1s);
    }
    function updateThemeStatusFotTheme() {
        const status = theme.colors.background;
        const styles: "light" | "dark" = (!theme.dark)? 'dark': 'light';
        const set: ThemeStatus = { color: status, style: styles };
        // Check
        const newTheme = [set, set];
        if (check(newTheme)) return;
        // Update
        _setThemeStatus(newTheme);
    }
    function setThemeStatus(newTheme: (ThemeStatus | undefined)[]) {
        const status = theme.colors.background;
        const styles: "light" | "dark" = (!theme.dark)? 'dark': 'light';
        const set = { color: status, style: styles };
        const newTheme2: ThemeStatus[] = [(newTheme[0])? newTheme[0]: set, (newTheme[1])? newTheme[1]: set];
        // Check
        if (check(newTheme2)) return;
        // Update
        _setThemeStatus(newTheme2);
    }

    function setTheme(_theme: 'normal' | 'dark') {
        if (_theme == 'dark') return _setTheme(ThemeDark);
        _setTheme(ThemeDark);
    }

    return(<ThemeContext.Provider value={{
        theme,
        themeNav,
        themeStatus,
        setTheme,
        setThemeStatus,
        updateThemeStatusFotTheme
    }}>
        {props.children}
    </ThemeContext.Provider>);
});