import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  const match = useRouteMatch();
  const history = useHistory();

  const movieToUpdate = props.movie.find(a => a.id === Number(match.params.id));

  useEffect(() => {
    movieToUpdate && setMovie(movieToUpdate);
  }, [props.movie, movieToUpdate]);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const convertToArray = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value.split(",") });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.setMovieList(
          props.movie.map(a => {
            return a.id === movie.id ? res.data : a;
          })
        );
        history.push(`/movies/${movie.id}`);
      })
      .catch(err => alert(err));
  };
  console.log(props.movie);
  console.log(movie);
  console.log(match.params.id);

  return (
    <div className="form-div">
      <h2 className="form-title">Update Movie</h2>
      {props.movie.length && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={movie.title}
            onChange={handleChange}
          />
          <label htmlFor="director">Director</label>
          <input
            type="text"
            name="director"
            placeholder="title"
            value={movie.director}
            onChange={handleChange}
          />
          <label htmlFor="metascore">Metascore</label>
          <input
            type="text"
            name="metascore"
            placeholder="title"
            value={movie.metascore}
            onChange={handleChange}
          />
          <label htmlFor="stars">Starring</label>
          <input
            type="text"
            name="stars"
            placeholder="title"
            value={movie.stars}
            onChange={convertToArray}
          />
          <button className="edit-btn">Submit Edit</button>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;