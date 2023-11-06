import React, { useState, useEffect } from 'react';
import GenreCollection from '../components/GenreCollection';
import { GenresGet } from "../axios/index.js";

import { Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Browser = ({ user }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      GenresGet()
        .then((res) => {
          console.log(res);
          setGenres(res.data);
          setIsLoading(false);
        })
        .catch(() => console.log('Error fetching data...'));
    } else {
      setGenres([]);
      setIsLoading(false);
    }
  }, []);

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {

    return (
      !isLoading && (
        <Container fluid>{
          genres.map((genre) => (
            <GenreCollection key={genre.id} genre={genre} />
          ))}
        </Container>

      )
    );
  }
}

export default Browser;