// import "../css/Moviecard.css";
// import { useState, useEffect } from "react";

// function MovieCard({ movie }) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   // ✅ Check if movie is already in favorites when component loads
//   useEffect(() => {
//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const isFav = favorites.some((fav) => fav.id === movie.id);
//     setIsFavorite(isFav);
//   }, [movie.id]);

//   // ✅ Handle favorite button click
//   const onFavoriteClick = (e) => {
//     e.stopPropagation(); // prevents any parent click events
//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     let updatedFavorites;

//     if (isFavorite) {
//       // Remove from favorites
//       updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
//     } else {
//       // Add to favorites
//       updatedFavorites = [...favorites, movie];
//     }

//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//     setIsFavorite(!isFavorite);
//   };

//   // ✅ Optional: Handle movie click (for future trailer playing)
//   const onCardClick = async () => {
//     console.log(`Clicked on: ${movie.title}`);
//     // can add trailer fetching logic later
//   };

//   return (
//     <div className="movie-card" onClick={onCardClick}>
//       <div className="movie-poster">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//         />
//         <div className="movie-overlay">
//           <button className="favorite-btn" onClick={onFavoriteClick}>
//             {isFavorite ? "❤️" : "🤍"}
//           </button>
//         </div>
//       </div>
//       <div className="movie-info">
//         <h3>{movie.title}</h3>
//         <p>{movie.release_date?.split("-")[0]}</p>
//       </div>
//     </div>
//   );
// }

// export default MovieCard;

import "../css/Moviecard.css";
import { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  // Check if movie is already in favorites
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = favorites.some((fav) => fav.id === movie.id);
    setIsFavorite(isFav);
  }, [movie.id]);

  // Handle favorite click
  const onFavoriteClick = (e) => {
    e.stopPropagation(); // prevent triggering trailer popup
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Fetch and show trailer on click
  const onCardClick = async () => {
    const apiKey = "e5d18b43e9667b553f850d2adfa76625"; // 🔑 Replace with your actual TMDB API key
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  // Close trailer popup
  const closeTrailer = (e) => {
    e.stopPropagation();
    setTrailerKey(null);
  };

  return (
    <div className="movie-card" onClick={onCardClick}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button className="favorite-btn" onClick={onFavoriteClick}>
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>

      {/* 🎥 Trailer popup */}
      {trailerKey && (
        <div className="trailer-popup" onClick={closeTrailer}>
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeTrailer}>✖</button>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
