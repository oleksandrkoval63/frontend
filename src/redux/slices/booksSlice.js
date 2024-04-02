import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import createBookWithId from '../../utils/createBookWithId'


const initialState = []

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async () => {
        const res = await axios.get('http://localhost:2000/random-book')
        return res.data
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            if(action.payload.title && action.payload.author){
            state.push(createBookWithId(action.payload, 'API'))
            }
        })
    }
})


export const { setAddBook, setDeleteBook, setToggleFavorite,} = booksSlice.actions

export default booksSlice.reducer