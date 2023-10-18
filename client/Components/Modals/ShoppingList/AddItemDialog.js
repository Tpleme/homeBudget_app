import React from 'react'
import { Button, Dialog, useTheme } from 'react-native-paper'
import { TextInput } from '../../Inputs/TextInputs'
import { useForm, Controller } from 'react-hook-form'
import { View } from 'react-native'
import WheelPicker from '../../WheelPicker/WheelPicker'

const measureData = ['lt', 'uni', 'kg', 'gr']

function AddItemDialog({ open, close, onAdd, t }) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm()
    const theme = useTheme()

    const submit = (data) => {
        onAdd({ ...data, checked: false })
        reset({
            name: '',
            quantity: '1',
        })
        close()
    }

    return (
        <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant }}>
            <Dialog.Title>{t('groceries.list.add.title')}</Dialog.Title>
            <Dialog.Content style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: t('groceries.list.add.inputs.product.errors.required') }}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ flex: 1 }}>
                            <TextInput
                                autoFocus={true}
                                label={t('groceries.list.add.inputs.product.label')}
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
                    rules={{ required: t('groceries.list.add.inputs.quantity.errors.required') }}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ width: '15%' }}>
                            <TextInput
                                label={t('groceries.list.add.inputs.quantity.label')}
                                type='numeric'
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.quantity)}
                                helperText={errors.quantity?.message}
                                contentStyle={{ marginLeft: -2, paddingLeft: 0, textAlign: 'center' }}
                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="measure"
                    rules={{ required: 'Value required' }}
                    render={({ field: { onChange } }) => (
                        <WheelPicker
                            width='10%'
                            itemHeight={30}
                            defaultValue='uni'
                            items={measureData}
                            onChange={onChange}
                        />
                    )}
                />

            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleSubmit(submit)}>{t('common.add')}</Button>
                <Button onPress={close}>{t('common.cancel')}</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

export default AddItemDialog