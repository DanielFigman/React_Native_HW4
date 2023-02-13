import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {FolderPlusIcon, PlusCircleIcon, XCircleIcon } from 'react-native-heroicons/outline';
import {FAB, Overlay } from 'react-native-elements';
import CategoryCard from '../Components/CategoryCard';
import { NotesContext } from '../Components/NotesContext';
import uuid from 'react-native-uuid';





const Categories = () => {

    const { categories, notes, newCategory, setCategories, setNotes, setNewCategory } = useContext(NotesContext);

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);


    const showCategories = categories.length > 0 ? categories.map(cat =>
        <CategoryCard
            key={cat.id}
            id={cat.id}
            title={cat.category}
        />) : "";
 

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);

    const handleChange = () => {
        if (newCategory != "") {
            const test = categories.filter(obj => obj.category.trim() === newCategory.trim()).length > 0 ? false : true;
            if (test) {
                setCategories([...categories, {category: newCategory, id:uuid.v4()}])
                setVisible(!visible);
            }
            else{
                alert("Category with the same name already exist")
            }
        }
    }

    return (

        <View className="bg-stone-200 flex h-full">
            <ScrollView >


                <Image source={{
                    uri: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80"
                }}
                    className="h-72 w-full"
                />


                <SafeAreaView className="items-center bg-stone-300 rounded-full m-5 shadow flex-col flex-1">
                    <View className="flex-row flex-1 space-x-3 pt-5 ">
                        <Text className="text-gray-900 font-bold text-7xl">
                            My
                        </Text>
                        <Text className=" text-amber-900 font-bold text-7xl">
                            Notes
                        </Text>
                    </View>
                </SafeAreaView>

                <SafeAreaView>
                    <View className="flex-1 space-x-3 pt-5 justify-center shadow">
                        {showCategories}
                    </View>
                </SafeAreaView>
            </ScrollView>

            <View className="flex-row pb-20 ">
                <FAB
                    title="Add Category"
                    placement="right"
                    onPress={toggleOverlay}
                    color="#967b1d"
                    icon={<FolderPlusIcon size={25} color={"white"} />}
                    className="mb-7"
                    size='medium'
                    buttonStyle={{ height: 57 }}
                />
                <Overlay
                    overlayStyle={{
                        backgroundColor: "#784E03",
                        height: 300,
                        borderRadius: 30,
                        marginTop: 10
                    }}
                    isVisible={visible}
                    onBackdropPress={() => { if (Keyboard) Keyboard.dismiss() }}
                >

                    <View className="flex-col h-1/3 w-72">
                        <Text className="text-3xl font-bold text-center mt-5">New Category</Text>
                        <TextInput
                            placeholder='Category Name'
                            keyboardAppearance='dark'
                            className="bg-stone-300 h-full text-center font-bold text-2xl mt-10"
                            onChangeText={text => setNewCategory(text)} />
                        <View className="flex-row mt-10">
                            <TouchableOpacity className="flex-1"
                                onPress={handleChange}>
                                <PlusCircleIcon size={50} color={"black"} fill="green" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleOverlay}>
                                <XCircleIcon color={"black"} size={50} fill="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>
            </View>
        </View>

    )
}

export default Categories