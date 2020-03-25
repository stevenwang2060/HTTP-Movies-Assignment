import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialMovie = {
  id: Date.now(),
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const AddForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  const history = useHistory();

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const convertToArray = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value.split(",") });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then(res => {
        console.log(res);
        props.setMovieList(res.data);

        history.push(`/`);
      })
      .catch(err => alert(err));
  };

  return (
    <div className="form-div">
      <h2 className="form-title">Add a Movie</h2>

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
        <button className="edit-btn">Add</button>
      </form>
    </div>
  );
};

export default AddForm;