import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({ title, numOfNotes }) => {


    return (
        <View className="flex-row shadow">
            <View className="items-center bg-stone-300 w-5/6 m-5 shadow flex-row flex-1 h-12 space-x-4">
                <TouchableOpacity>
                    <Text className="bottom-0 text-center font-bold">{title}</Text>
                </TouchableOpacity>

            </View>
            <View className="bg-stone-300 rounded-full w-1/6 m-5 shadow items-center pt-2">
                <Text className="rounded-full text-2xl">0</Text>
            </View>
        </View>
    )
}

export default CategoryCard