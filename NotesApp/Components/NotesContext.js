import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

export const NotesContext = createContext();


export default function NotesContextProvider(props) {

    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [headerImage, setHeaderImage] = useState([]);

    const setNewNote = (category, note) => {
        let newNotes = notes.filter(cat => cat !== category);
        let categoryNotes = notes.filter(cat => cat === category);
        categoryNotes.push(note);
        newNotes.push({ [category]: categoryNotes });
        setNotes(newNotes);
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
                setNewNote
            }}
        >
            {props.children}
        </NotesContext.Provider>
    )
}