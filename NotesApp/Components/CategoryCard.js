import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NotesContext } from './NotesContext';
import { Overlay } from 'react-native-elements';

const CategoryCard = ({ title, id }) => {

    const navigation = useNavigation();
    const { notes, removeCategory } = useContext(NotesContext);

    const [deleteOverlay, setDeleteOverlay] = useState(false)


    const numOfNotes = notes && notes[title] ? notes[title].length : 0;


    return (
        <View className="flex-row shadow">
            <Overlay
                overlayStyle={{
                    backgroundColor: "white",

                }}
                onBackdropPress={() => setDeleteOverlay(false)}
                isVisible={deleteOverlay}
            >
                <TouchableOpacity onPress={() => {
                    removeCategory(title, id);
                    setDeleteOverlay(false);
                }}>
                    <Text className="text-2xl text-red-500">Delete category</Text>
                </TouchableOpacity>
            </Overlay>
            <View className="items-center bg-stone-300 w-5/6 m-5 shadow flex-1 h-12 space-x-4">
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CategoryScreen", {
                            title
                        });
                    }}

                    onLongPress={() => {
                        setDeleteOverlay(true)
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