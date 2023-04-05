import React, { useState } from "react";
import { createContext } from "react";
import { MD3DarkTheme, MD3Theme } from "react-native-paper";
import { Theme as NavTheme, DarkTheme as NavThemeDark } from "@react-navigation/native";
import { ThemeDark, ThemeNavigationDark } from "../Scripts/Theme";

export type ThemeContextType = {
    theme: MD3Theme;
    themeNav: NavTheme;
    setTheme: (_props: 'normal' | 'dark')=>void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: MD3DarkTheme,
    themeNav: NavThemeDark,
    setTheme: (_props)=>{}
});

export default React.memo(function ThemeProvider(props: any) {
    const [theme, _setTheme] = useState(ThemeDark);
    const [themeNav, _setThemeNav] = useState(ThemeNavigationDark);

    function setTheme(_theme: 'normal' | 'dark') {
        if (_theme == 'dark') return _setTheme(ThemeDark);
        _setTheme(ThemeDark);
    }

    return(<ThemeContext.Provider value={{
        theme,
        themeNav,
        setTheme
    }}>
        {props.children}
    </ThemeContext.Provider>);
});