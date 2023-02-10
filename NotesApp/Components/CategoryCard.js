import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NotesContext } from './NotesContext';

const CategoryCard = ({ title }) => {

    const navigation = useNavigation();
    const {notes} = useContext(NotesContext);

    const numOfNotes = notes.filter(category => category == title).length;
    

    return (
        <View className="flex-row shadow">
            <View className="items-center bg-stone-300 w-5/6 m-5 shadow flex-1 h-12 space-x-4">
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CategoryScreen", {
                            title
                        });
                    }}
                >
                    <Text numberOfLines={1} className="font-bold text-2xl pt-2">{title}</Text>
                </TouchableOpacity>

            </View>
            <View className="bg-amber-900 rounded-full w-1/6 m-5 shadow items-center pt-2">
                <Text className="rounded-full text-2xl text-white">{numOfNotes}</Text>
            </View>
        </View>
    )
}

export default CategoryCard