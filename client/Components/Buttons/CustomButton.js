import React from 'react'
import { Button } from 'react-native-paper'
import { useTheme } from 'react-native-paper'

function CustomButton({ label, mode, onPress, loading, color, ...props }) {
    const theme = useTheme()

    return (
        <Button
            mode={mode ?? 'contained'}
            buttonColor={color ?? theme.colors.primary}
            onPress={loading ? null : onPress}
            loading={loading}
            {...props}
        >
            {label}
        </Button>
    )
}

export default CustomButton