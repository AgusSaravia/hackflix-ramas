import MovieList from "./components/MovieList";
import RatingFilter from "./components/RatingFilter";
function App() {
  const handleStars = () => {
    setFilteredMovies();
  };
  return (
    <>
      <MovieList />
    </>
  );
}

export default App;
