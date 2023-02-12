import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { ArrowLeftIcon, PhotoIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import { NotesContext } from '../Components/NotesContext';
import { Overlay } from 'react-native-elements';


const NoteScreen = () => {

    const navigation = useNavigation();

    const { params: {
        title,
        id,
        date,
        content,
        images
    } } = useRoute();


    const [imageOverlay, setImageOverlay] = useState("");
    const [thisContent, setThisContent] = useState(content);
    const [theseImages, setTheseImages] = useState(images);
    const [hasChanged, setHasChanged] = useState(false);


    const { updateNote } = useContext(NotesContext)


    useEffect(() => {
        if (hasChanged) {
            updateNote(title, id, thisContent, theseImages);
        }
    }, [hasChanged]);

    const setThisContentFunc = (newValue) => {
        setThisContent(newValue);
        setHasChanged(true);
    };

    const setTheseImagesFunc = (newValue) => {
        setTheseImages(newValue);
        setHasChanged(true);
    };





    // const {set} = useContext(second)
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

    const renderImages = theseImages.length > 0 ? theseImages.map((imgUri, index) =>
        <TouchableOpacity
            onPress={() => setImageOverlay(imgUri)}
            key={index}
        >
            <Image source={{
                uri: imgUri

            }}
                className="h-72 w-80 rounded-md"
            />
        </TouchableOpacity>
    ) : "";

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let currNoteImages = [...theseImages];
            result.assets.forEach(img => currNoteImages.push(img.uri));
            setTheseImagesFunc(currNoteImages)
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);


    return (
        <SafeAreaView>
            <ScrollView className="relative h-full" keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled'>
                <View className="bottom-10 h-10">
                    <TouchableOpacity
                        style={{ backgroundColor: "hsla(0, 100%, 0%, 0.8)" }}
                        onPress={navigation.goBack}
                        className="absolute top-10 left-2 p-2 rounded-full items-center">
                        <ArrowLeftIcon size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="pt-10">
                    <Text className="font-bold text-2xl text-center mt-2">{date}</Text>
                </View>
                <TextInput
                    multiline
                    defaultValue={thisContent}
                    className="text-3xl px-5 mt-10 mx-5 shadow-2xl bg-gray-200"
                    onEndEditing={event => setThisContentFunc(event.nativeEvent.text)}
                >
                </TextInput>
                {showImage}
                <ScrollView
                    contentContainerStyle={{
                        padding: 50,
                        paddingBottom: 50,

                    }}
                    showsHorizontalScrollIndicator={false}
                    className="space-y-5"
                >
                    {renderImages}
                </ScrollView>
            </ScrollView>
            <TouchableOpacity className="bottom-5 items-center"
                onPress={pickImage}
            >
                <PhotoIcon size={50} color={"black"} fill="yellowgreen" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default NoteScreen