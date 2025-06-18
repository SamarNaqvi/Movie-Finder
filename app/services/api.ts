const TMDB_CONFIG = {
 BASE_URL: "https://api.themoviedb.org/3/",
 Headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}



export const fetchMovies = async ({query=""}:{query?:string}) =>{
    const endPoint = query ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}discover/movie?language=en-US&page=1`;
    const res = await fetch(endPoint, {method:"GET", headers: TMDB_CONFIG.Headers });

    if(!res.ok)
    {
        //@ts-ignore
        throw new Error("Unable to fetch movies", res.statusText);
    }

    const result = await res.json();

    return result.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.Headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
