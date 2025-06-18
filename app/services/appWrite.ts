import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const SAVE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPRWRITE_SAVE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);
const database = new Databases(client);

export const updateAppwriteSearchCount = async (
  query: string,
  movie: Movie
) => {
  try {
    const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    if (results?.documents?.length > 0 && results?.documents?.[0]) {
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        results?.documents?.[0]?.$id,
        { count: results?.documents?.[0]?.count + 1 }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        movie_id: movie?.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        title: movie?.title,
        searchTerm: query,
        count: 1,
      });
    }
  } catch (exception) {
    throw exception;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return res.documents as unknown as TrendingMovie[];
  } catch (exception) {
    throw exception;
  }
};

export const updateMovieStatus = async (movie: MovieDetails, shouldSave:boolean=true) => {
  try {
    const movies = await database.listDocuments(DATABASE_ID, SAVE_COLLECTION_ID, [
      Query.equal("movie_id", movie?.id),
    ]);
    if (movies.documents.length > 0) {
      await database.updateDocument(
        DATABASE_ID,
        SAVE_COLLECTION_ID,
        movies.documents[0].$id,
        {
          is_saved: shouldSave,
        }
      );
    }
    else{
         await database.createDocument(DATABASE_ID, SAVE_COLLECTION_ID, ID.unique(), {
        movie_id: movie?.id,
        poster_path: movie?.poster_path,
        title: movie?.title,
        is_saved:true,
        vote_average: movie?.vote_average,
        release_date: movie?.release_date
      });
    }
  } catch (exception) {
    console.log("exception", exception);
    throw exception;
  }
};

export const isMovieSaved = async (movieId: number) => {
  try {
    const movie = await database.listDocuments(DATABASE_ID, SAVE_COLLECTION_ID, [
      Query.equal("movie_id", movieId),
    ]);
    return movie.documents.length > 0 && movie.documents[0]["is_saved"];
  } catch (exception) {
    throw exception;
  }
};

export const getSavedMovies = async (): Promise<SavedMovie[]> => {
  try {
    const movies = await database.listDocuments(DATABASE_ID, SAVE_COLLECTION_ID, [
      Query.equal("is_saved", true),
    ]);

    return movies.documents as unknown as SavedMovie[];
  } catch (exception) {
    throw exception;
  }
};
