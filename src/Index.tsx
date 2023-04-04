import React from "react";
import App from "./App";
import ThemeProvider from "./Providers/ThemeProvider";
import 'react-native-gesture-handler';

export default React.memo(function Index() {
    return(<ThemeProvider>
        <App />
    </ThemeProvider>);
});