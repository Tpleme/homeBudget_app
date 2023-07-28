import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import NavigateBack from '../Misc/NavigateBack';
import { TextInput } from '../Components/Inputs/TextInputs';
import CustomButton from '../Components/Buttons/CustomButton';
import { useForm, Controller } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ForgotPasswordScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' })
    const onSubmit = data => {
        console.log(data)
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202020',
                paddingTop: insets.top + 40
            }}>
            <NavigateBack navigation={navigation} />
            <StatusBar barStyle="light-content" backgroundColor="#202020" />
            <View style={styles.mainView}>
                <Text style={styles.title}>Forgot your password?</Text>
                <Text style={styles.subtitle}>Do not worry, just type in your email that is registered in the app.</Text>
                <Text style={styles.subtitle}>Then you will receive an email with all the instructions.</Text>

                <Controller
                    control={control}
                    name="email"
                    defaultValue=''
                    rules={{
                        required: 'Email required',
                        pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Invalid email format' }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder='Type your email here'
                            value={value}
                            type="email-address"
                            onChange={onChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                    )}
                />
                <CustomButton disabled={!isValid} label='Recover password' onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
}

export default ForgotPasswordScreen

ForgotPasswordScreen.propTypes = {
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 20,
        paddingHorizontal: 40,
        height: '100%',
        width: '100%',
        gap: 20,
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    }
});