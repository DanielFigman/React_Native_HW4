import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { NotesContext } from './NotesContext'
import { MapPinIcon, StarIcon } from 'react-native-heroicons/outline'




const NoteCard = () => {
    return (
        <TouchableOpacity>
            <View className="pb-4 px-3">
                <Text className="font-bold text-lg pt-2">"Hello"</Text>
                <View className="flex-row items-center space-x-1">
                    <StarIcon color="green" opacity={0.5} size={22} />
                    <Text className="text-xs text-gray-500">
                        <Text className="text-green-500">4.5</Text> · hello
                    </Text>
                </View>
                <View className="flex-row space-x-1 items-center mt-1">
                    <MapPinIcon color="gray" opacity={0.4} size={22} />
                    <Text className="text-start text-gray-500">Nearby · asdsadasdsad</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default NoteCard