import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";

/** @description: BookList Component */

class BookList extends React.Component {
    state = {};

/** @function: Filter the books as per shelf*/
updateShelf = (bookId, event) => {
    let currentBooks = this.props.currentBooks;
    const book = currentBooks.filter((book) => book.id === bookId)[0];
    book.shelf = event.target.value;
    BooksAPI.update(book, event.target.value).then((response) => {
      this.setState({
        books: currentBooks,
      });
    });
  };

  render() {
    return (
      <div>
        <div className="bg-blue-400 py-3 px-0 text-center">
          <h1 className="m-0 text-4xl font-medium text-white">MyReads</h1>
        </div>

        <div className="flex-1 px-0 pt-0 pb-0">
          {/*Display the three different shelves in main pages with its current books */}
          <BookShelf
            key="currently"
            books={this.props.currentBooks.filter(
              (book) => book.shelf === "currentlyReading"
            )}
            updateShelf={this.updateShelf}
            shelfTitle="Currently Reading"
          />
          <BookShelf
            key="wantToRead"
            books={this.props.currentBooks.filter(
              (book) => book.shelf === "wantToRead"
            )}
            updateShelf={this.updateShelf}
            shelfTitle="Want to Read"
          />
          <BookShelf
            key="read"
            books={this.props.currentBooks.filter(
              (book) => book.shelf === "read"
            )}
            updateShelf={this.updateShelf}
            shelfTitle="Read"
          />
        </div>
        <div
          className="w-50 h-50 fixed right-20 bottom-20 block 
                            rounded-full bg-blue-400 bg-[url('./icons/add.svg')] bg-auto bg-no-repeat shadow-lg "
        >
          <Link to="/search" className="text-white opacity-0">
            Add a
            <br />
            Button
          </Link>
        </div>
      </div>
    );
  }
}

export default BookList;