import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import filterReducer from './slices/filterSlice';

const store = configureStore({
    reducer: {
        books: booksSlice,
        filter: filterReducer,
    }
})

export default store