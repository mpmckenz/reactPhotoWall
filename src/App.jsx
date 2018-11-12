import React, { Component } from "react";
import "./App.css";

// This URL can be combined with an photo id to fetch a photo.
const PHOTO_URL = "https://picsum.photos/200?photo=";
// This URL can be used to get an array of objects that contain information
// about various photos.
const PHOTO_LIST_URL = "https://picsum.photos/list";

class App extends Component {
  state = { photos: [], numberOfPhotostoRender: 0 };

  componentDidMount() {
    fetch(PHOTO_LIST_URL)
      .then(response => response.json())
      .then(photoArr => {
        this.setState({
          photos: photoArr,
          numberOfPhotostoRender: 10
        });
      });
  }

  handleLoadMoreImages = event => {
    this.setState(previousState => ({
      numberOfPhotostoRender: previousState.numberOfPhotostoRender + 10
    }));
  };

  render() {
    const { photos = [] } = this.state;
    return (
      <React.Fragment>
        <header>
          <h1>Photo Wall</h1>
          <hr />
          <p>
            Alas, I have conquered the foregrounds of React. Never shall I turn
            back!
          </p>
        </header>
        <div className="collage">
          {photos.slice(0, this.state.numberOfPhotostoRender).map(photo => (
            <img
              id={"allPhotos"}
              alt={photo.filename}
              key={photo.id}
              src={PHOTO_URL + photo.id}
            />
          ))}
        </div>
        <button onClick={this.handleLoadMoreImages}>Load More Images</button>
      </React.Fragment>
    );
  }
}

export default App;
