import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import MovieCard from "./MovieCard";
import RatingFilter from "./RatingFilter";
import { mapStarsToVoteAverage } from "../utils/ratingMapping"; // Importar la función de mapeo

const MovieList = () => {
  const [data, setData] = useState(null); // Almacena las películas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [selectedStars, setSelectedStars] = useState(0); // Número de estrellas seleccionadas

  // Manejar cambios en la calificación
  const handleRatingChange = (newRating) => {
    const stars = newRating;
    setSelectedStars(stars);
  };

  // Resetear el filtro
  const resetFilter = () => {
    setSelectedStars(0);
  };

  // Filtrar las películas basadas en la calificación seleccionada
  const filteredMovies = useMemo(() => {
    if (!data) return [];
    const minVoteAverage = mapStarsToVoteAverage(selectedStars);
    console.log(
      `Selected Stars: ${selectedStars}, Min Vote Average: ${minVoteAverage}`
    );
    const filtered =
      minVoteAverage > 0
        ? data.filter((movie) => movie.vote_average >= minVoteAverage)
        : data;
    console.log(`Número de películas filtradas: ${filtered.length}`);
    return filtered;
  }, [selectedStars, data]);

  // Fetch de datos al montar el componente
  useEffect(() => {
    fetch("/movies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((moviesData) => {
        setData(moviesData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error("Error fetching data: ", fetchError);
        setError(fetchError);
        setLoading(false);
      });
  }, []);

  // Manejar estados de carga y error
  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Hubo un error al cargar los datos: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Sección de Filtro */}
      <RatingFilter
        selectedStars={selectedStars}
        onRatingChange={handleRatingChange}
        onReset={resetFilter}
      />

      {/* Lista de Películas Filtradas */}
      <Row>
        {filteredMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard
              title={movie.title}
              popularity={movie.popularity}
              releaseDate={movie.release_date}
              voteAvrg={movie.vote_average}
              imgSrc={movie.poster_path}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
