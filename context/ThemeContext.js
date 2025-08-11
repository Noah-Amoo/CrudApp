import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from '@/constants/Colors';

export const ThemeContext = createContext({})

export const ThemeProvider = ({ Children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

    const theme = colorScheme === 'dark'
        ? Colors.dark
        : Colors.light

    return (
        <ThemeContext.Provider value={{
            colorScheme, setColorScheme, theme
        }}>
            {Children}
        </ThemeContext.Provider>
    )
}