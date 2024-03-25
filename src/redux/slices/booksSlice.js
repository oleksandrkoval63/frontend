import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const booksSlice = createSlice({
    name: 'books',
    initialState: initialState,
    reducers: {
        setAddBook: (state, action) => {
            return [...state, action.payload]
        },
        setDeleteBook: (state, action) => {
            return state.filter((book) => book.id !== action.payload)
        },
        setToggleFavorite: (state, action) => {
            return state.map((book) => 
            book.id === action.payload ? {...book, isFavorite: !book.isFavorite }
            : book)
        }
    }
})

export const { setAddBook, setDeleteBook, setToggleFavorite,} = booksSlice.actions


export default booksSlice.reducer