import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, CameraIcon, PencilSquareIcon, PhotoIcon, PlusCircleIcon, PlusIcon, XCircleIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { NotesContext } from '../Components/NotesContext';
import NoteCard from '../Components/NoteCard';
import { FAB, Overlay } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';



const CategoryScreen = () => {
    // Use states 
    const [visible, setVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteImages, setNoteImages] = useState([]);
    const [thisHeaderImage, setThisHeaderImage] = useState("https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80");
    const [imageOverlay, setImageOverlay] = useState("");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    
    // Use Contexts
    const { notes, setNewNote, headerImage, setHeaderImages } = useContext(NotesContext);


    // Use Navigation
    const navigation = useNavigation();

    // params from the parent component
    const { params: {
        title,
    } } = useRoute();


    //Function and variblas 

    const pickHeaderImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setThisHeaderImage(result.assets[0].uri)
            let newHeaderImages = {...headerImage}
            newHeaderImages[title] = result.assets[0].uri
            setHeaderImages(newHeaderImages);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 7,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let currNoteImages = [];
            result.assets.forEach(img => currNoteImages.push(img.uri));
            setNoteImages(currNoteImages);
        }
    };

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


    //Use Effect
    useEffect(() => {
        let image = headerImage[title]
        if (image)
            setThisHeaderImage(image)
    }, [])


    useEffect(() => {
        if (currentNote != "") {
            setNewNote(title, currentNote);
        }
    }, [currentNote])

    useEffect(() => {
        setNoteContent("");
        setNoteImages([]);
    }, [notes])
    




    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const numOfNotes = notes && notes[title] ? notes[title].length : 0;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);



    const renderNotes = notes[title] ? notes[title].map((note, index) =>
        <NoteCard
            key={index}
            date={note.date}
            content={note.content}
            images={note.images}
        />) : "";


    const renderImages = noteImages.map((imgUri, index) =>
        <TouchableOpacity
            onPress={() => setImageOverlay(x)}
            key={index}
        >
            <Image source={{
                uri: imgUri

            }}
                className="h-12 w-12"
            />
        </TouchableOpacity>
    )


    const toggleOverlay = (close) => {
        setVisible(!visible);
        if (close) {
            setNoteContent("");
            setNoteImages([]);
        }
    };

    const handleChange = () => {
        if (noteContent != "" && noteImages.length !== 0) {
            setCurrentNote({ content: noteContent, images: noteImages, date: new Date(Date.now()).toDateString() + " - " + new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) });
            setVisible(false);
        }
        else if (noteContent != "") {
            setCurrentNote({ content: noteContent, images: [], date: new Date(Date.now()).toDateString() + " - " + new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) });
            setVisible(false);
        }
        else if (noteImages.length !== 0) {
            setCurrentNote({ content: "", images: noteImages, date: new Date(Date.now()).toDateString() + " - " + new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) });
            setVisible(false);
        }
    }



    return (
        <View className="bg-stone-200 h-full">
            <ScrollView >
                <View className="flex-row">
                    <Image source={{
                        uri: thisHeaderImage

                    }}
                        className="h-72 w-full"
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: "hsla(0, 100%, 0%, 0.8)" }}
                        onPress={navigation.goBack}
                        className="absolute top-10 left-2 p-2 rounded-full items-center">
                        <ArrowLeftIcon size={25} color="white" />
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity
                            onPress={pickHeaderImage}
                            className="flex-col mt-48 right-24 space-y-3 items-center item rounded-full w-20 h-20" style={{ backgroundColor: "hsla(0, 100%, 0%, 0.8)", }}>
                            <PencilSquareIcon color={"black"} size={30} style={{ top: 5, }} fill={"white"} />
                            <View className="items-center space-y-0 bottom-2">
                                <Text className="font-bold text-white text-xs">Edit</Text>
                                <Text className="font-bold text-white text-xs">Image</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <SafeAreaView>
                    <View className="shadow bg-gray-300 m-5 rounded-md">
                        <View className="mt-3 flex-row px-5 space-x-16">
                            <Text className="text-center text-5xl font-bold">{title}</Text>
                            <Text className="text-5xl font-bold flex-1">»</Text>
                            <Text className="text-5xl font-bold">{numOfNotes}</Text>
                        </View>
                    </View>
                </SafeAreaView>


                {/* Note Card */}
                {renderNotes}

            </ScrollView>
            <View className="absolute bottom-0 px-52">
                <FAB
                    title=""
                    placement="right"
                    onPress={toggleOverlay}
                    color="#967b1d"
                    icon={<PlusIcon size={25} color={"white"} />}
                    className=""
                    size='medium'
                    buttonStyle={{ height: 57 }}
                />
                <Overlay
                    overlayStyle={{
                        backgroundColor: "#784E03",
                        height: 600,
                        width: 400,
                        borderRadius: 30,
                        marginTop: 10
                    }}
                    isVisible={visible}
                    onBackdropPress={() => { if (Keyboard) Keyboard.dismiss() }}
                    fullScreen={true}
                >
                    <View className="flex-col h-3/5">
                        <Text className="text-3xl font-bold text-center mt-5">New Note</Text>
                        <TextInput
                            placeholder='New Note...'
                            className="bg-stone-300 h-72 font-bold text-2xl mt-10"
                            onChangeText={text => setNoteContent(text)}
                            multiline={true} />
                    </View>
                    {isKeyboardVisible ?
                        <TouchableOpacity
                            style={{ backgroundColor: "hsla(0, 100%, 0%, 0.8)" }}
                            className="flex-col items-center justify-center text-white  w-14 h-18  bottom-52 left-80 ml-2 absolute"
                            onPress={() => { if (Keyboard) Keyboard.dismiss() }}
                        >
                            <XMarkIcon color={"white"} />
                            <Text className="text-white text-xs">Close</Text>
                            <Text className="text-white text-xs">Keyboad</Text>
                        </TouchableOpacity>
                        :
                        ""
                    }

                    <View>
                        {showImage}
                    </View>
                    <View className="flex-row pt-14 space-x-2 flex-1">
                        {renderImages}
                    </View>
                    <View className="h-0 w-full relative justify-between">
                        <View className="flex-row bottom-12 space-x-14">
                            <TouchableOpacity className="flex-1"
                                onPress={handleChange}>
                                <PlusCircleIcon size={50} color={"black"} fill="green" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1"
                                onPress={pickImage}
                            >
                                <PhotoIcon size={50} color={"black"} fill="yellowgreen" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1">
                                <CameraIcon size={50} color={"black"} fill="gray" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleOverlay(true)}>
                                <XCircleIcon color={"black"} size={50} fill="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>
            </View>
        </View>
    )
}

export default CategoryScreen