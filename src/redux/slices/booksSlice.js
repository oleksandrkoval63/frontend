import axios from 'axios'
import { createSlice } from "@reduxjs/toolkit"
import createBookWithId from '../../utils/createBookWithId'


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

export const thunkFunction = async( dispatch, getState) => {
    try {
       const res = await axios.get('http://localhost:2000/random-book')
       if(res.data && res.data.title && res.data.author && res.data.year){
          dispatch(setAddBook(createBookWithId(res.data, 'API')))
       }
    } catch (error) {
       console.log('Error fetching random book', error);
    }
 }

export default booksSlice.reducer