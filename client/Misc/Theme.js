import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

export const DarkTheme = {
    ...MD3DarkTheme,
    roundness: 2,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#FF6347',
        onPrimary: '#ffffff',
        primaryContainer: '#ffdad3',
        onPrimaryContainer: '#FF6347',
        elevation: {
            level2: '#373737'
        }
    }
}

export const LightTheme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#FF6347',
    }
}