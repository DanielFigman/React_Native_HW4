import { View, Text, Image, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { NotesContext } from './NotesContext'
import { Overlay } from 'react-native-elements'




const NoteCard = ({ date, content, images }) => {

    const [imageOverlay, setImageOverlay] = useState("");


    const renderImages = images != undefined ? images.map((imgUri, index) =>
        <TouchableOpacity
            onPress={() => setImageOverlay(imgUri)}
            key={index}
        >
            <Image source={{
                uri: imgUri

            }}
                className="h-36 w-36 rounded-md"
            />
        </TouchableOpacity>
    ) : "";

    const showImage = (
        imageOverlay != "" ?
            <Overlay
                overlayStyle={{
                    backgroundImage: "#0000ffff",
                    height: -1,
                    width: 400,
                    marginTop: 10
                }}
                onBackdropPress={() => setImageOverlay("")}
                isVisible={imageOverlay != ""}
            >
                <Image source={{
                    uri: imageOverlay

                }}
                    className="h-72 w-full"
                />
            </Overlay>
            :
            ""
    );

    return (
        <View className="space-y-2">
            <View className="shadow-2xl bg-gray-400 m-5 rounded-3xl">
                <TouchableOpacity>
                    <View className="px-3">
                        <Text className="font-bold text-lg pt-2 text-center text-gray-700">{date}</Text>
                    </View>
                    <Text numberOfLines={3} ellipsizeMode='tail' className="px-5 font-bold text-justify pb-2">
                        {content}
                    </Text>
                </TouchableOpacity>
                {showImage}
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        padding: 10,
                        paddingBottom: 20,
                        
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="space-x-2"
                >
                    {renderImages}
                </ScrollView>

                <TouchableOpacity>
                    <Text className="flex-row p-3 text-right font-bold">
                        View note...</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default NoteCard