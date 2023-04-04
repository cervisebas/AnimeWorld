import React, { useState } from "react";
import { createContext } from "react";
import { MD3DarkTheme, MD3Theme } from "react-native-paper";
import ThemeJSONNormal from "../Scripts/theme.json";
import GetThemeForToken from "../Scripts/GetThemeForToken";

const ThemeNormal = GetThemeForToken(ThemeJSONNormal as any, 'light');

export const ThemeContext = createContext<{
    theme: MD3Theme,
    setTheme: (_props: 'normal' | 'dark')=>void;
}>({
    theme: MD3DarkTheme,
    setTheme: (_props)=>{}
});

export default React.memo(function ThemeProvider(props: any) {
    const [theme, _setTheme] = useState(ThemeNormal);

    function setTheme(_theme: 'normal' | 'dark') {
        if (_theme == 'dark') return _setTheme(ThemeNormal);
        _setTheme(ThemeNormal);
    }

    return(<ThemeContext.Provider value={{
        theme,
        setTheme
    }}>
        {props.children}
    </ThemeContext.Provider>);
});