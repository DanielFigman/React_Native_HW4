import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Bars3Icon, FolderPlusIcon, PlusCircleIcon, PlusIcon, TrashIcon, UserIcon } from 'react-native-heroicons/outline';
import { FloatingAction } from "react-native-floating-action";
import { Button, FAB, Overlay } from 'react-native-elements';
import AddCategory from '../Components/AddCategory';
import CategoryCard from '../Components/CategoryCard';




const Categories = () => {

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const [newCategory, setNewCategory] = useState("")
    const [categories, setCategories] = useState([])




    const showCategories = categories.map(cat => <CategoryCard key={cat} title={cat} />)

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);


    const actions = [
        {
            text: "Accessibility",
            color: "#e7d287",
            name: "bt_accessibility",
            position: 2
        },
        {
            text: "Language",
            color: "#e7d287",
            name: "bt_language",
            position: 1
        },
        {
            text: "Location",
            color: "#e7d287",
            name: "bt_room",
            position: 3
        },
        {
            text: "Video",
            color: "#e7d287",
            name: "bt_videocam",
            position: 4
        }
    ];

    const handleChange = (e) => {
        const data = e.target.value;

        setNewCategory(data)
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
                <FloatingAction
                    actions={actions}
                    floatingIcon={<Bars3Icon color={"#FFFFFF"} />}
                    color={"#967b1d"}
                    position={'left'}
                    showBackground={false}
                />
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
                <Overlay overlayStyle={{ backgroundColor: "#784E03", height: 300, borderRadius: 30, marginTop: 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View className="flex-col h-1/3 w-72">
                        <Text className="text-3xl font-bold text-center mt-5">New Category</Text>
                        <TextInput
                            value={newCategory}
                            placeholder='Category Name'
                            className="bg-stone-300 h-full text-center font-bold text-2xl mt-10"
                            onChange={handleChange} />
                        <TouchableOpacity
                            onPress={() => { newCategory != "" ? setCategories([...categories, newCategory]) : "" }}>
                            <PlusCircleIcon size={50} color={"black"} style={{ marginTop: 40, left: 230 }} />
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
        </View>

    )
}

export default Categories