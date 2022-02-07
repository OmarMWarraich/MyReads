import { render } from '@testing-library/react';
import React, { Component } from 'react';
import * as BooksAPI from "./BooksAPI";


class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.updateData();
  }
  
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateData();
    })
  }
  updateData = () => {
    BooksAPI.getAll().then(data => console.log(data));
  }


render() {
  return (
    <div></div>
  )
}

};


export default App;
