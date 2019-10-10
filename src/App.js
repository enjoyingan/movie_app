import React, {Component} from 'react';

import './App.css';
import Movie from './Movie.js';

// const movieTitle = [
//   'Harry Potter',
//   'Bugs',
//   'Toy Story',
//   'About Time'
// ]

// const moviePoster = [
//   'https://www.pambazuka.org/sites/default/files/styles/flexslider_full/public/field/image/EW_Harry-Potter_Featured.jpg?itok=XphMvnG2',
//   'https://www.cartoonson.tv/_resources/Cartoons/movie/32/image/555x418/a_bugs_life_coloring.jpg',
//   'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Toy_Story.jpg/220px-Toy_Story.jpg',
//   'https://i.ytimg.com/vi/u2PUMA6nFWk/maxresdefault.jpg'
// ]


class App extends Component{ //component -> return -> render
  state = {

  }

  componentWillMount(){
    console.log('will mount')

  }
  componentDidMount(){
    this._getMovies()
  }

  _getMovies = async() => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
  _renderMovies = () => {
    const movies = this.state.movies.map((movie=>{
      return <Movie 
      title={movie.title} 
      poster={movie.medium_cover_image} 
      key= {movie.id}
      genres={movie.genres}
      synopsis={movie.synopsis} />
    }))
    return movies
  }
  
  render(){
    return(
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>




        /* <Movie title={movieTitle[0]} poster={moviePoster[0]}/>{ /* call movie component */
        /* <Movie title={movieTitle[1]} poster={moviePoster[1]}/>
        <Movie title={movieTitle[2]} poster={moviePoster[2]}/>
        <Movie title={movieTitle[3]} poster={moviePoster[3]}/> */

    )
  }
}

export default App;
