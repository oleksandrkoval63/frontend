import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(setError(error.message))
            throw error
        }
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState: initialState,
    reducers: {
        setAddBook: (state, action) => {
           state.books.push(action.payload)
        },
        setDeleteBook: (state, action) => {
            return {
                ...state, 
                books: state.books.filter((book) => book.id !== action.payload)
            }
        },
        setToggleFavorite: (state, action) => {
            state.books.forEach((book) => {
                if(book.id === action.payload){
                    book.isFavorite = !book.isFavorite
                }  
            })
        }
    },
    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.isLoadingViaAPI = true
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.isLoadingViaAPI = false
            if(action.payload.title && action.payload.author) {
                state.books.push(createBookWithId(action.payload, 'API'))
            }         
        },
        [fetchBook.rejected]: (state) => {
            state.isLoadingViaAPI = false
        },
    }
    // extraReducers: (builder) => {
    //     builder.addCase(fetchBook.fulfilled, (state, action) => {
    //         if(action.payload.title && action.payload.author){
    //         state.books.push(createBookWithId(action.payload, 'API'))
    //         }
    //     })
    // }
})


export const { setAddBook, setDeleteBook, setToggleFavorite,} = booksSlice.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer