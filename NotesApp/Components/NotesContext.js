import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

export const NotesContext = createContext();


export default function NotesContextProvider(props) {

    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [headerImage, setHeaderImages] = useState([]);

    const setNewNote = (category, note) => {
        let newNotes = { ...notes };
        if (newNotes[category]) {
            newNotes[category].push(note);
        } else {
            newNotes[category] = [note];
        }
        setNotes(newNotes);
        console.log(notes)
    }

    return (
        <NotesContext.Provider
            value={{
                categories,
                notes,
                newCategory,
                setCategories,
                setNotes,
                setNewCategory,
                setNewNote,
                headerImage,
                setHeaderImages
            }}
        >
            {props.children}
        </NotesContext.Provider>
    )
}