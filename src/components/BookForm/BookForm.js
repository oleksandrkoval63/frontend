import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddBook, fetchBook } from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import createBookWithId from "../../utils/createBookWithId";
import booksData from '../../data/books.json'
import "./BookForm.css";

const BookForm = () => {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const dispatch = useDispatch()

   const handleAddRandomBook = () =>{
      const radnomIndex = Math.floor(Math.random() * booksData.length)
      const randomBooks = booksData[radnomIndex]

      dispatch(setAddBook(createBookWithId(randomBooks, 'random')))
   }

   const handelSubmit = (e) => {
      e.preventDefault();

      if (title && author) {
         const book = createBookWithId({title, author}, 'manual')
         dispatch(setAddBook(book))

         setAuthor("");
         setTitle("");
      } else{
         dispatch(setError('You must fill title and author!'))
      }
   };


   const handleAddRandomBookViaAPI = () => {
      dispatch(fetchBook('http://localhost:2000/random-book'))
   }

   
   
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
            <button type="button" onClick={handleAddRandomBookViaAPI}>Add Random via API</button>
         </form>
      </div>
   );
};

export default BookForm;
