// lodash throttles the amount of rquests to the server
// _ is in place of "Lodash"
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import API_KEY_YT from '../credentials.js';
const API_KEY = API_KEY_YT;

// Creat new component. This component should produce
// some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }
  // 3. fetched the new videos, & video to play (selectedVideo)
  // 4. go to search_bar.js
  videoSearch(term) {
    YTsearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // 2. term => calls the search function with the argument (term)
    // but with a delay takes (term) calls a function that rturns
    // a new function that only gets called every 300ms
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      // 1. into searchbar onto the porperty onSearchTermChange
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
        videos={this.state.videos} />
    </div>
    );
  }
};



// This this components generassted HTML and put
// in page (int the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
