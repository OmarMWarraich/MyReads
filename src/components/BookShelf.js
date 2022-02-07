import React from "react";

/** @description: BookShelf Component */

class BookShelf extends React.Component {
  state = {};

  render() {
    /* display the book in the right shelf*/
    return (
      <div className="px-5 pt-3 pb-20">
        <h2 className="mb-5 text-2xl font-semibold text-white">
          {this.props.shelfTitle}
          <span>
            <hr></hr>
          </span>
        </h2>
        <div className="content-center">
          <ol className="m-0 flex list-none flex-wrap justify-center p-0">
            {this.props.books
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
                      className="absolute right-8 bottom-0 h-8 w-8 rounded-full bg-yellow-400
                                                bg-[url('./icons/arrow-drop-down.svg')] bg-center bg-no-repeat shadow-lg"
                    >
                      {/*On change pass the book id and event*/}
                      <select
                        className="max-h-full max-w-full cursor-pointer opacity-0"
                        value={book.shelf}
                        onChange={(event) =>
                          this.props.updateShelf(book.id, event)
                        }
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
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
export default BookShelf;
