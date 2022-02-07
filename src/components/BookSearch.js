import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

/**
 *  @description: BookSearch Component
 *  @constructor
 *  @type {ComponentState}
 */

class BookSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      books: [],
    };
  }

  /** @function: update shelf data for each shelf */

  updateData = (books) => {
    const cBooks = books.map((book) => {
      //Locate the book
      book.shelf = "none";
      this.props.currentBooks.forEach((book2) => {
        if (book.id === book2.id) {
          book.shelf = book2.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: cBooks,
    });
  };

  /** @query: Read the response when search term entered.*/

  updateQuery = (query) => {
    this.setState({ query: query });
    if (query) {
      BooksAPI.search(query, 20)
        .then((books) => {
          books.length > 0
            ? this.updateData(books)
            : this.setState({ books: [] });
        })
        .catch((e) => {
          console.log(`The API responded with an error: ${e}`);
        });
    } else {
      this.setState({ books: [] });
    }
  };
  /** @function: Shelf updated on change of shelf/when shelf is changed  */

  updateBooks = (book, shelf) => {
    let current = this.state.books;
    const bookToUpdate = current.filter((cBook) => cBook.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: current,
    });
    this.props.updateShelf(book, shelf);
  };

  render() {
    return (
      <div className="search-books">
        <div className="z-5 fixed top-0 left-0 flex w-full text-2xl shadow-lg ">
          <Link
            to="/"
            className="block w-10 bg-yellow-400 bg-[url('./icons/arrow-back.svg')]  bg-auto bg-no-repeat"
          >
            <span className="opacity-0">Close</span>
          </Link>
          <div className="flex-1 bg-yellow-400">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              className="py-15 w-full px-10 outline-none"
            />
          </div>
        </div>
        <div className="px-5 pt-20 pb-5">
          <ol className="m-0 flex list-none flex-wrap justify-center p-0">
            {this.state.books
              .filter((book) => book.imageLinks)
              .map((book) => (
                <li key={book.id} className="px-7.5 w-40 py-5 text-left">
                  <div className="h-200 relative flex items-end">
                    <div
                      className="bg-white shadow-lg"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                          "url(" + book.imageLinks.thumbnail + ")",
                      }}
                    />
                    <div
                      className="boxshadowd absolute right-8 bottom-0 h-8 w-8 rounded-full
                                                bg-yellow-400 bg-[url('./icons/arrow-drop-down.svg')] bg-center bg-no-repeat"
                    >
                      {/*On change pass the book id and event*/}
                      <select
                        className="max-h-full max-w-full cursor-pointer opacity-0"
                        value={book.shelf}
                        onChange={(e) => {
                          this.updateBooks(book, e.target.value);
                        }}
                      >
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  {/*Display the book title and author*/}
                  <div className="mt-2.5 pt-2 pl-0 pr-1 text-sm text-white">
                    {book.title}
                  </div>
                  <div className="pr-5 text-yellow-400">
                    {book.authors && <div>{book.authors[0]}</div>}
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
