import { View, Text, Image, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { NotesContext } from './NotesContext'
import { Overlay } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'




const NoteCard = ({ title, id, date, content, images }) => {

    const [imageOverlay, setImageOverlay] = useState("");
    const [deleteOverlay, setDeleteOverlay] = useState(false)

    const navigation = useNavigation();

    const { removeNote } = useContext(NotesContext);



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
                    backgroundColor: "white",
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

    const handlePress = () => {
        navigation.navigate("NoteScreen", {
            title,
            id,
            date,
            content,
            images
        });
    }

    const handleLongPress = () => {
        setDeleteOverlay(true)
    }



    return (
        <View className="space-y-2">

            <View className="shadow-2xl bg-gray-400 m-5 rounded-3xl">
                <View className="border-stone-900">
                    <Overlay
                        overlayStyle={{
                            backgroundColor: "white",

                        }}
                        onBackdropPress={() => setDeleteOverlay(false)}
                        isVisible={deleteOverlay}
                    >
                        <TouchableOpacity onPress={() => {
                            removeNote(title, id);
                            setDeleteOverlay(false);
                        }}>
                            <Text className="text-2xl text-red-500">Delete note</Text>
                        </TouchableOpacity>
                    </Overlay>
                </View>
                <TouchableOpacity
                    onPress={handlePress}
                    onLongPress={handleLongPress}
                >
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

                <TouchableOpacity
                    onPress={handlePress}
                    onLongPress={handleLongPress}>
                    <Text className="flex-row p-3 text-right font-bold">
                        View note...</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default NoteCard