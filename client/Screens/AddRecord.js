import React, { useState, useEffect } from 'react'
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

function AddRecord({ navigation }) {
    const insets = useSafeAreaInsets();

    const [categoriesData, setCategoriesData] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [subCategoriesData, setSubCategoriesData] = useState(null)
    const [usersData, setUsersData] = useState(null)
    const [loading, setLoading] = useState(false)

    const { userInfo } = useUserInfo()
    const { control, handleSubmit, setValue, formState: { errors } } = useForm()


    useEffect(() => {
        getEntity({ entity: 'categories' }).then(res => {
            setCategoriesData(res.data.map(el => ({ ...el, title: el.name })))
        })

        getEntity({ entity: 'app_users' }).then(res => {
            setUsersData(res.data.map(el => ({ ...el, title: el.name })))
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
            value: data.value
        }

        createEntity('records', sendData).then(res => {
            setLoading(false)
            setValue('value', null)
            alert(res.data)
        }, err => {
            setLoading(false)
            alert(err)
        })
    }

    return (
        <ScrollView
            contentContainerStyle={{ minHeight: '100%' }}
            style={{
                ...styles.wrapper,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <NavigateBack navigation={navigation} />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Use the following form to create a new record</Text>
                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="value"
                        rules={{ required: 'Value required' }}
                        render={({ field: { onChange, value } }) => (
                            <InputCurrency
                                label='Value'
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
                            required: 'Please Pick a category',
                        }}
                        render={({ field: { onChange } }) => (
                            <Autocomplete
                                label='Category'
                                itemLabel='name'
                                dataSet={categoriesData}
                                onChange={(e) => { onChange(e); setSelectedCategory(e) }}
                                placeholder='Select a Category'
                                error={Boolean(errors.category)}
                                helperText={errors.category?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="subcategory"
                        rules={{
                            required: 'Please pick a subcategory',
                        }}
                        render={({ field: { onChange } }) => (
                            <Autocomplete
                                label='Subcategory'
                                itemLabel='name'
                                disabled={Boolean(!selectedCategory)}
                                dataSet={subCategoriesData}
                                onChange={onChange}
                                placeholder={selectedCategory ? 'Select a subcategory' : 'Select a category first'}
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
                            required: 'Please pick a person',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                label='Paid By'
                                initialValue={userInfo}
                                itemLabel='name'
                                textInputAdditionalProps={{ value: value?.title }} //necessary to have a initial value
                                dataSet={usersData}
                                onChange={onChange}
                                placeholder='Select a person'
                                renderItemType='withAvatar'
                                error={Boolean(errors.paidBy)}
                                helperText={errors.paidBy?.message}
                            />
                        )}
                    />
                </View>
                <View style={styles.actionsView}>
                    <CustomButton loading={loading} label={loading ? 'Submitting...' : 'Submit'} onPress={handleSubmit(onSubmit)} />
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
        marginBottom: 50
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