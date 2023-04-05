import { MD3Theme } from "react-native-paper";
import { Theme as NavTheme } from "@react-navigation/native";
import tokens from "./theme.json";
import GetThemeForToken, { GetThemeNavigation } from "./GetThemeForToken";

/*export const ThemeLight: MD3Theme = GetThemeForToken(tokens as any, 'light');
export const ThemeNavigationLight: NavTheme = GetThemeNavigation(ThemeLight);*/

export const ThemeDark: MD3Theme = GetThemeForToken(tokens as any, 'light');
export const ThemeNavigationDark: NavTheme = GetThemeNavigation(ThemeDark);