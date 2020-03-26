import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movies }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  const handleHistory = () => {
    history.push(`/update-movie/${match.params.id}`);
  };

  const handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovieList(movies.filter(a => a.id !== res.data));
        history.push("/");
      })
      .catch(err => alert(err));
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={handleHistory}>
        Edit
      </div>
      <div
        className="delete-button"
        onClick={() => {
          handleDelete(match.params.id);
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default Movie;