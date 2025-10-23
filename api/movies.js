// // api/movies.js
// import fetch from 'node-fetch'; // Make sure node-fetch is installed in your project

// const BASE_URL = "https://api.themoviedb.org/3";

// export default async function handler(req, res) {
//   const { query } = req.query;             // Get search query from frontend
//   const API_KEY = process.env.TMDB_API_KEY; // Use Vercel environment variable

//   // Determine API endpoint: search or popular movies
//   let url;
//   if (query) {
//     url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
//   } else {
//     url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
//   }

//   try {
//     const response = await fetch(url);     // Fetch from TMDB API
//     const data = await response.json();    // Parse JSON
//     res.status(200).json(data.results);   // Send only results to frontend
//   } catch (err) {
//     console.error(err);                    // Log any error
//     res.status(500).json({ error: "Failed to fetch movies" });
//   }
// }
// api/movies.js
import fetch from 'node-fetch';

const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(req, res) {
  const { query } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  // Debugging: check if API key is available
  console.log("TMDB_API_KEY:", API_KEY);

  if (!API_KEY) {
    return res.status(500).json({ error: "TMDB_API_KEY is not set" });
  }

  let url;
  if (query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  } else {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.results);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}

