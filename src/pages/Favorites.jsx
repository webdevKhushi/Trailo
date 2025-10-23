import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-page">
      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <h2>No Favorite Movies Yet.</h2>
          <p>Start adding movies to favorites and they will appear here.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
