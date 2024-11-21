import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import MovieCard from "./MovieCard";
import RatingFilter from "./RatingFilter";
import { mapRatingToFive } from "../utils/ratingMapping.ts";
import axios from "axios";
const MovieList = () => {
  const [data, setData] = useState(null); // Almacena las películas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [selectedStars, setSelectedStars] = useState(0); // Número de estrellas seleccionadas

  const handleChangeRate = (rate) => {
    setSelectedStars(rate);
  };
  // Resetear el filtro
  const resetFilter = () => {
    setSelectedStars(0);
  };

  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch de datos al montar el componente
  useEffect(() => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;

    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            include_adult: false,
            include_video: false,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (response && response.data && response.data.results) {
          setData(response.data.results);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const filteredMovies = useMemo(() => {
    if (!selectedStars) return data;
    return data.filter((movie) => {
      const mappedRating = mapRatingToFive(movie.vote_average);
      return Math.round(mappedRating) === selectedStars;
    });
  }, [selectedStars, data]);
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
        onRatingChange={handleChangeRate}
        onReset={resetFilter}
      />

      {/* Lista de Películas Filtradas */}
      {filteredMovies.length > 0 ? (
        <Row>
          {filteredMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                title={movie.original_title}
                popularity={movie.popularity}
                releaseDate={movie.release_date}
                voteAvrg={movie.vote_average}
                imgSrc={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="mt-4">
          No hay películas con esa puntuación.
        </Alert>
      )}
    </Container>
  );
};

export default MovieList;
