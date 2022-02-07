// import { render } from '@testing-library/react';
import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";

/** @description Main App component. */

class App extends Component {
  state = {
    books: [],
  };

  /**
   *  @Lifecycle event handler called just after the app loads into the DOM.
   *  Call the API to get all the books.
   */

  componentDidMount() {
    this.updateData();
  }

  /** Update to handle shelf change*/

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.updateData();
    });
  };

  /** Update the book in the state*/

  updateData = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data,
      });
    });
  };

  render() {
    return (
      <div className="bg-lime-600 pb-0">
        <Router>
          <Routes>
            {/*For current app*/}
            <Route
              exact
              path="/"
              element={<BookList currentBooks={this.state.books} />}
            />
            <Route
              exact
              path="/search"
              element={
                <BookSearch
                  updateShelf={this.updateShelf}
                  currentBooks={this.state.books}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
