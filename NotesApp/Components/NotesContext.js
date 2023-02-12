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
    }

    const updateNote = (category, noteID, noteContent, noteImages) => {
        const newNotes = { ...notes }
        let changedNote = newNotes[category].filter(obj => obj.id == noteID);
        changedNote[0].content = noteContent;
        changedNote[0].images = noteImages;

        setNotes(newNotes);
    }

    const removeNote = (category, noteID) => {
        const newNotes = { ...notes };
        const catNotes = newNotes[category];
        if (newNotes[category])
            delete newNotes[category]
        const newCatNotes = catNotes.filter(note => note.id !== noteID);
        newNotes[category] = newCatNotes;
        setNotes(newNotes);
    }

    const removeCategory = (category, id) => {
        const newCategories = categories.filter(cat => cat.id !== id);

        const newNotes = { ...notes };
        if (newNotes[category])
            delete newNotes[category];

        setCategories(newCategories);
        setNotes(newNotes);
    }

    const removeImage = (category, noteID, imgUri) => {
        const newNotes = { ...notes }
        let changedNote = newNotes[category].filter(obj => obj.id == noteID);
        const images = changedNote[0].images.filter(uri => uri !== imgUri)
        changedNote[0].images = images;

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
                setNewNote,
                headerImage,
                setHeaderImages,
                removeNote,
                removeCategory,
                updateNote,
                removeImage
            }}
        >
            {props.children}
        </NotesContext.Provider>
    )
}