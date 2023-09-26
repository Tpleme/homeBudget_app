import React, { useEffect } from 'react'
import { Button, Dialog, Text, useTheme } from 'react-native-paper'
import { TextInput } from '../../Inputs/TextInputs'
import { useForm, Controller } from 'react-hook-form'
import { View } from 'react-native'
import WheelPicker from '../../WheelPicker/WheelPicker'

function AddItemDialog({ open, close, onAdd }) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm()
    const theme = useTheme()

    const submit = (data) => {
        console.log(data)
        // onAdd({ name: 'Eggs', quantity: '1', measure: 'uni', checked: false })
        // close()
    }

    return (
        <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant }}>
            <Dialog.Title>Add item to list</Dialog.Title>
            <Dialog.Content style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Value required' }}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ flex: 1 }}>
                            <TextInput
                                label='Product'
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="quantity"
                    defaultValue='1'
                    rules={{ required: 'Value required' }}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ width: '15%' }}>
                            <TextInput
                                label='Qtd.'
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.quantity)}
                                helperText={errors.quantity?.message}
                                contentStyle={{ marginLeft: -2, paddingLeft: 0, textAlign: 'center' }}
                            />
                        </View>
                    )}
                />
                    <WheelPicker 
                    width='10%'
                    itemHeight={30} 
                    items={['lt', 'kg', 'uni', 'gr']}
                    onChange={(el) => console.log(el)}
                    />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleSubmit(submit)}>Add</Button>
                <Button onPress={close}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

export default AddItemDialog