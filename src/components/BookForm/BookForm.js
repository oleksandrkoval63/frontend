import { useState } from "react";
import { useDispatch } from "react-redux";
import {v4 as uuidv4} from 'uuid'
import { addBook } from '../../redux/books/actionCreators'
import booksData from '../../data/books.json'
import "./BookForm.css";

const BookForm = () => {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const dispatch = useDispatch()

   const handleAddRandomBook = () =>{
      const radnomIndex = Math.floor(Math.random() * booksData.length)
      const randomBooks = booksData[radnomIndex]

      const randomBookWithId = {
         ...randomBooks,
         id: uuidv4(),
         year: randomBooks.year
      }

      dispatch(addBook(randomBookWithId))
   }

   const handelSubmit = (e) => {
      e.preventDefault();

      if (title && author) {
         const book = {
            title,
            author,
            id: uuidv4(),
         }
         dispatch(addBook(book))

         setAuthor("");
         setTitle("");
      } 
   };

   

   
   
   return (
      <div className="app-block book-form">
         <h2>Add a new book</h2>
         <form onSubmit={handelSubmit}>
            <div>
               <label htmlFor="title">Title: </label>
               <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
               />
            </div>
            <div>
               <label htmlFor="author">Author: </label>
               <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
               />
            </div>
            <button type="submit">Add book</button>
            <button type="button" onClick={handleAddRandomBook}>Add Random</button>
         </form>
      </div>
   );
};

export default BookForm;
