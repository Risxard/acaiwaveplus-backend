export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  media_type?: "movie" | "tv" | "person";
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  job?: string;
  department?: string;
  credit_id?: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}



export interface TMDBCredits {
  cast: TMDBMedia[];
  crew: TMDBMedia[];
}

export interface ImagesInterface {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesResponse<T> {
  backdrops: ImagesInterface[];
  posters: ImagesInterface[];
  logos: ImagesInterface[];
  id: number;
}

export interface VideosInterface {
  iso_639_1: string | null;
  iso_3166_1: string | null;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideosResponse<T> {
  results: VideosInterface[];
  id: number;
}


export interface TMDBPersonResponse {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  movie_credits: TMDBCredits;
  tv_credits: TMDBCredits;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBGenresResponse {
  genres: TMDBGenre[];
}