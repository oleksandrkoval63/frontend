import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import filterReducer from './slices/filterSlice';
import errorReducer from './slices/errorSlice'

const store = configureStore({
    reducer: {
        books: booksSlice,
        filter: filterReducer,
        error: errorReducer,
    }
})

export default store