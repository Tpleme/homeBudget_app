import React, { useEffect } from 'react'
import { Button, Dialog, useTheme } from 'react-native-paper'
import { TextInput } from '../../Inputs/TextInputs'
import { useForm, Controller } from 'react-hook-form'
import { View } from 'react-native'
import WheelPicker from '../../WheelPicker/WheelPicker'

const measureData = ['lt', 'uni', 'kg', 'gr']

function EditItemDialog({ t, open, close, onSubmit, item }) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm()
    const theme = useTheme()

    useEffect(() => {
        setValue('name', item.data.name)
        setValue('quantity', item.data.quantity)
        setValue('measure', item.data.measure)
    }, [item])

    const submit = (data) => {
        onSubmit({ item: { ...data, checked: false }, index: item.index })
        close()
    }

    return (
        <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant }}>
            <Dialog.Title>{t('groceries.list.edit.title')}</Dialog.Title>
            <Dialog.Content style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Controller
                    control={control}
                    name="name"
                    defaultValue={item.data.name}
                    rules={{ required: t('groceries.list.edit.inputs.product.errors.required') }}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ flex: 1 }}>
                            <TextInput
                                label={t('groceries.list.edit.inputs.product.label')}
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
                    defaultValue={item.data.quantity}
                    rules={{ required: t('groceries.list.edit.inputs.quantity.errors.required') }}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ width: '15%' }}>
                            <TextInput
                                label={t('groceries.list.edit.inputs.quantity.label')}
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
                    defaultValue={item.data.measure}
                    render={({ field: { onChange } }) => (
                        <WheelPicker
                            width='10%'
                            itemHeight={30}
                            defaultValue={item.data.measure}
                            items={measureData}
                            onChange={onChange}
                        />
                    )}
                />

            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleSubmit(submit)}>{t('common.submit')}</Button>
                <Button onPress={close}>{t('common.cancel')}</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

export default EditItemDialog