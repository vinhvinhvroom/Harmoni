import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutShops: [],
      searchString: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newSearchString = event.target.value
    this.setState({ searchString: newSearchString })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(`Form submitted: ${this.state.searchString}`);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Search</label>
        <input type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />

        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default SearchBar;
