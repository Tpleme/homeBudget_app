import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

export const DarkTheme = {
    ...MD3DarkTheme,
    roundness: 1,
    colors: {
        ...MD3DarkTheme.colors,
        primary: 'tomato',
        onPrimary: '#ffffff',
        primaryContainer: '#ffdad3',
        onPrimaryContainer: 'tomato'
    }
}

export const LightTheme = {
    ...MD3LightTheme,
    roundness: 1,
    colors: {
        ...MD3LightTheme.colors,
        primary: 'tomato',
    }
}