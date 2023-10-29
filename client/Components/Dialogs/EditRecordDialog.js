import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { getEntity, editEntity } from '../../API/requests';
import { InputCurrency } from '../Inputs/TextInputs';
import Autocomplete from '../Inputs/Autocomplete';
import { DatePickerInput } from 'react-native-paper-dates'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import CustomButton from '../Buttons/CustomButton';

//subcategory default não funciona
function EditRecordDialog({ open, close, record, closeAfterEdit }) {
    const [categoriesData, setCategoriesData] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [subCategoriesData, setSubCategoriesData] = useState(null)
    const [usersData, setUsersData] = useState(null)
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation()
    const theme = useTheme()
    const { control, handleSubmit, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        if (open) {
            getEntity({ entity: 'categories' }).then(res => {
                setCategoriesData(res.data.map(el => ({ ...el, title: el.name })))
                setSelectedCategory(res.data.find(el => el.id === record.subcategory.category.id))
            })

            getEntity({ entity: 'app_users' }).then(res => {
                setUsersData(res.data.map(el => ({ ...el, title: el.name })))
            })
            console.log(record)
        }
    }, [open])


    useEffect(() => {
        if (selectedCategory) {
            setSubCategoriesData(selectedCategory.subcategories.map(el => ({ ...el, title: el.name })))
            return;
        }
        setSubCategoriesData(null)
        setValue('subcategory', null)

    }, [selectedCategory])

    const onSubmit = data => {
        console.log(data)
        // setLoading(true)

        // const sendData = {
        //     paidBy: data.paidBy.id,
        //     subcategoryId: data.subcategory.id,
        //     value: data.value,
        //     date: data.date
        // }

        // editEntity({ entity: 'records', id: record.id, data: sendData }).then(res => {
        //     showMessage({ message: res.data, type: 'success' })
        //     setLoading(false)
        //     setValue('value', null)
        //     closeAfterEdit()
        // }, err => {
        //     console.log(err)
        //     showMessage({ message: 'Error adding new record', type: 'danger' })
        //     setLoading(false)
        // })
    }


    return (
        <Portal>
            <Dialog visible={open} onDismiss={close} style={{ backgroundColor: theme.colors.surfaceVariant, ...styles.dialog }}>
                <View style={styles.mainContainer}>
                    <View style={styles.form}>
                        <Controller
                            control={control}
                            name="value"
                            defaultValue={record.value}
                            rules={{ required: t('addRecord.fields.value.errors.required') }}
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    label={t('addRecord.fields.value.label')}
                                    value={value}
                                    onChange={onChange}
                                    error={Boolean(errors.value)}
                                    helperText={errors.value?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="category"
                            defaultValue={{ ...record.subcategory.category, title: record.subcategory.category.name }}
                            rules={{
                                required: t('addRecord.fields.category.errors.required'),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    label={t('addRecord.fields.category.label')}
                                    itemLabel='name'
                                    initialValue={record.category}
                                    dataSet={categoriesData}
                                    textInputAdditionalProps={{ value: value?.title }} //necessary to have a initial value
                                    onChange={(e) => { onChange(e); setSelectedCategory(e) }}
                                    placeholder={t('addRecord.fields.category.placeholder')}
                                    error={Boolean(errors.category)}
                                    helperText={errors.category?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="subcategory"
                            defaultValue={{ ...record.subcategory, title: record.subcategory.name }}
                            rules={{
                                required: t('addRecord.fields.subcategory.errors.required'),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    label={t('addRecord.fields.subcategory.label')}
                                    itemLabel='name'
                                    initialValue={record.subcategory}
                                    disabled={Boolean(!selectedCategory)}
                                    textInputAdditionalProps={{ value: value?.title }} //necessary to have a initial value
                                    dataSet={subCategoriesData}
                                    onChange={onChange}
                                    placeholder={selectedCategory ? t('addRecord.fields.subcategory.placeholder1') : t('addRecord.fields.subcategory.placeholder2')}
                                    error={Boolean(errors.subcategory)}
                                    helperText={errors.subcategory?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="paidBy"
                            defaultValue={{ ...record.payer, title: record.payer.name }}
                            rules={{
                                required: t('addRecord.fields.paid.errors.required'),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    label={t('addRecord.fields.paid.label')}
                                    initialValue={record.payer}
                                    itemLabel='name'
                                    textInputAdditionalProps={{ value: value?.title }} //necessary to have a initial value
                                    dataSet={usersData}
                                    onChange={onChange}
                                    placeholder={t('addRecord.fields.paid.placeholder')}
                                    renderItemType='withAvatar'
                                    error={Boolean(errors.paidBy)}
                                    helperText={errors.paidBy?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="date"
                            defaultValue={moment().toDate()}
                            rules={{
                                required: t('addRecord.fields.date.errors.required'),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <DatePickerInput
                                    locale="pt"
                                    value={value}
                                    onChange={onChange}
                                    inputMode="start"
                                    mode="outlined"
                                    withDateFormatInLabel={false}
                                    style={{ backgroundColor: '#202020' }}
                                    outlineStyle={{ borderRadius: 10 }}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.actionsView}>
                        <CustomButton loading={loading} label={loading ? t('common.submitting') : t('common.submit')} onPress={handleSubmit(onSubmit)} />
                        <CustomButton disabled={loading} label={t('common.cancel')} onPress={close} />
                    </View>
                </View>
            </Dialog>
        </Portal>
    )
}

export default EditRecordDialog

const styles = StyleSheet.create({
    dialog: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#202020',
    },
    mainContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    form: {
        height: 500,
        width: '100%',
        marginBottom: 20
    },
    actionsView: {
        marginTop: 'auto',
        gap: 10,
        width: '100%',
    },
})