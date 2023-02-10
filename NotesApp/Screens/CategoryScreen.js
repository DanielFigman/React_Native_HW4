import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, CameraIcon, PencilSquareIcon, PhotoIcon, PlusCircleIcon, PlusIcon, XCircleIcon } from 'react-native-heroicons/outline';
import { NotesContext } from '../Components/NotesContext';
import NoteCard from '../Components/NoteCard';
import { FAB, Overlay } from 'react-native-elements';


const CategoryScreen = () => {
    // Use states 
    const [visible, setVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteImages, setNoteImages] = useState([]);


    // Use Contexts
    const { notes, setNewNote, headerImage, setHeaderImage } = useContext(NotesContext);

    // Use Navigation
    const navigation = useNavigation();

    // params from the parent component
    const { params: {
        title,
    } } = useRoute();

    ///////////////////////////////////////////////////

    let thisHeaderImage = headerImage.filter(cat => cat == title);

    const numOfNotes = notes.filter(category => category == title).length;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);

    const filteredNotes = notes.filter(note => note === title)

    const renderNotes = filteredNotes.map(note =>
        <NoteCard
            date={note.date}
            content={note.contet}
            images={note.images}
        />)


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handleChange = () => {
        if (noteContent != "" && noteImages.length !== 0) {
            setCurrentNote({ content: noteContent, images: [noteImages], date: Date.now() });
            setVisible(false);
        }
        else if (noteContent != "") {
            setCurrentNote({ content: noteContent, images: [], date: Date.now() });
            setVisible(false);
        }
        else if (noteImages.length !== 0) {
            setCurrentNote({ content: "", images: [noteImages], date: Date.now() });
            setVisible(false);
        }
    }

    useEffect(() => {
        setNewNote(title, currentNote);
        setNoteContent("");
        setNoteImages([]);
    }, [currentNote])


    return (
        <View className="bg-stone-200 h-full">
            <ScrollView >
                <View className="flex-row">
                    <Image source={{
                        uri: headerImage === undefined ? "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80" : headerImage

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
                            onPress={() => {

                            }}
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
                    <View className="flex-row pt-44">
                        <TouchableOpacity className="flex-1"
                            onPress={handleChange}>
                            <PlusCircleIcon size={50} color={"black"} fill="green" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1">
                            <PhotoIcon size={50} color={"black"} fill="yellowgreen" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1">
                            <CameraIcon size={50} color={"black"} fill="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleOverlay}>
                            <XCircleIcon color={"black"} size={50} fill="red" />
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
        </View>
    )
}

export default CategoryScreen