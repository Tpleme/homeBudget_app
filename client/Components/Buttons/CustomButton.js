import React from 'react'
import { Button } from 'react-native-paper'

function CustomButton({ label, mode, onPress, loading, color, ...props }) {
    return (
        <Button
            mode={mode ?? 'contained'}
            color={color ?? 'tomato'}
            onPress={loading ? null : onPress}
            loading={loading}
            {...props}
        >
            {label}
        </Button>
    )
}

export default CustomButton