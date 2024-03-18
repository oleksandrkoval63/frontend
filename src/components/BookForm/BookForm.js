import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from '../../redux/books/actionCreators'
import "./BookForm.css";

const BookForm = () => {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const dispatch = useDispatch()

   const handelSubmit = (e) => {
      e.preventDefault();

      if (title && author) {
         const book = {
            title: title,
            author: author
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
         </form>
      </div>
   );
};

export default BookForm;
