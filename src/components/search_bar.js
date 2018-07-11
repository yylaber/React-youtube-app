// we are turning { Component into a variable }
import React, { Component } from 'react';

// 5. extend the Component variable creted before from index.js
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  render() {
    return (
      // 6. return the new value
      <div className="search-bar">
        <input value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
      );
  }
  // 7.
  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
