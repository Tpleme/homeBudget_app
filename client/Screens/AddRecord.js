import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigateBack from '../Misc/NavigateBack';
import { useForm, Controller } from 'react-hook-form'
import CustomButton from '../Components/Buttons/CustomButton';
import { getEntity } from '../API/requests'
import { InputCurrency } from '../Components/Inputs/TextInputs';
import Autocomplete from '../Components/Inputs/Autocomplete';
import { useUserInfo } from '../Hooks/useUser'
import { createEntity } from '../API/requests';
import { DatePickerInput } from 'react-native-paper-dates'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import { StoreContext } from '../Context/Store/index'
import { useTranslation } from 'react-i18next';

function AddRecord({ navigation }) {
    const insets = useSafeAreaInsets();

    const [storeState, dispatch] = useContext(StoreContext)
    const [categoriesData, setCategoriesData] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [subCategoriesData, setSubCategoriesData] = useState(null)
    const [usersData, setUsersData] = useState(null)
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation()
    const { userInfo } = useUserInfo()
    const { control, handleSubmit, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        getEntity({ entity: 'categories' }).then(res => {
            setCategoriesData(res.data.map(el => ({ ...el, title: el.name })))
        })

        getEntity({ entity: 'app_users' }).then(res => {
            setUsersData(res.data.map(el => ({ ...el, title: el.name })))
            setValue('paidBy', { ...userInfo, title: userInfo.name }) //Default no controller parece não funcionar
        })
    }, [])


    useEffect(() => {
        if (selectedCategory) {
            setSubCategoriesData(selectedCategory.subcategories.map(el => ({ ...el, title: el.name })))
            return;
        }
        setSubCategoriesData(null)
        setValue('subcategory', null)

    }, [selectedCategory])

    const onSubmit = data => {
        setLoading(true)

        const sendData = {
            createdBy: userInfo.id,
            paidBy: data.paidBy.id,
            subcategoryId: data.subcategory.id,
            value: data.value,
            date: data.date
        }

        createEntity({ entity: 'records', data: sendData }).then(res => {
            showMessage({ message: res.data, type: 'success' })
            setLoading(false)
            setValue('value', null)
            dispatch({ type: 'setRefreshRecords' });
        }, err => {
            console.log(err)
            showMessage({ message: 'Error adding new record', type: 'danger' })
            setLoading(false)
        })
    }

    return (
        <ScrollView
            contentContainerStyle={{ minHeight: '100%' }}
            style={{
                ...styles.wrapper,
                paddingBottom: insets.bottom,
            }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <NavigateBack navigation={navigation} />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{t('addRecord.title')}</Text>
                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="value"
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
                        rules={{
                            required: t('addRecord.fields.category.errors.required'),
                        }}
                        render={({ field: { onChange } }) => (
                            <Autocomplete
                                label={t('addRecord.fields.category.label')}
                                itemLabel='name'
                                dataSet={categoriesData}
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
                        rules={{
                            required: t('addRecord.fields.subcategory.errors.required'),
                        }}
                        render={({ field: { onChange } }) => (
                            <Autocomplete
                                label={t('addRecord.fields.subcategory.label')}
                                itemLabel='name'
                                disabled={Boolean(!selectedCategory)}
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
                        defaultValue={{ ...userInfo, title: userInfo.name }}
                        rules={{
                            required: t('addRecord.fields.paid.errors.required'),
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                label={t('addRecord.fields.paid.label')}
                                initialValue={userInfo}
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
                </View>
            </View>
        </ScrollView>
    );
}

export default AddRecord

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: '#202020',
    },
    mainContainer: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        gap: 20,
        marginTop: 20,
        marginBottom: 20
    },
    actionsView: {
        marginTop: 'auto',
        gap: 10,
        width: '100%',
    },

});


AddRecord.propTypes = {
    navigation: PropTypes.object
}