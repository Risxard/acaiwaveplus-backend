
import tmdbRepository from "../repository/tmdb.repository";
import { ImagesInterface, ImagesResponse, TMDBGenre, TMDBListResponse, TMDBMedia, TMDBPersonResponse, VideosInterface } from "../types/tmdb.types";
import cache from "../utils/cache";
import { mapMovieGenreToTvGenre, buildWithoutGenres, mapCertificationGenre } from "../utils/functions";
import { selectBestImage } from "../utils/imageSelector.ts";
import videoFilter from "../utils/videoFilter";

class TMDBService {

  async getTrending(timeWindow: "day" | "week", pageType: "movie" | "tv", language: string, page: number): Promise<TMDBMedia[]> {
    const cacheKey = `trending:${timeWindow}:${pageType}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchTrending(timeWindow, pageType, language, page);
    const movies = data.results.slice(0, 20);
    cache.set(cacheKey, movies);

    return movies;
  }

  async getMediaDetail(
    mediaType: "movie" | "tv",
    mediaId: number,
    language: string
  ): Promise<TMDBMedia> {
    const cacheKey = `mediadetail:${mediaType}:${mediaId}:${language}`;
    const cached = cache.get<TMDBMedia>(cacheKey);

    if (cached) {
      return cached;
    }

    const append_to_response = "videos,similar,translations,credits";

    const response = await tmdbRepository.fetchMediaDetails(
      mediaType,
      mediaId,
      append_to_response,
      language
    );


    const mediaDetail = response.results[0];

    cache.set(cacheKey, mediaDetail);

    return mediaDetail;
  }



  async getRecommendations(mediaType: "movie" | "tv", mediaId: number, language: string, page: number): Promise<TMDBMedia[]> {
    const cacheKey = `recommendations:${mediaType}:${mediaId}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchRecommendations(mediaType, mediaId, language, page);
    const movies = data.results.slice(0, 20);
    cache.set(cacheKey, movies);

    return movies;
  }

  async getNowPlaying(pageType: "movie" | "tv", language: string, region: string, page: number): Promise<TMDBMedia[]> {
    const cacheKey = `nowplaying:${pageType}:${language}:${region}${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }




    const data = await tmdbRepository.fetchNowPlaying(pageType, language, region, page);
    const movies = data.results.slice(0, 10);
    cache.set(cacheKey, movies);

    return movies;
  }



  async getPerGenres(
    pageType: "movie" | "tv",
    language: string,
    with_genres: string,
    sort_by: string,
    page: number = 1
  ): Promise<TMDBMedia[]> {
    const region = language.includes("-")
      ? language.split("-")[1]
      : language;


    const cacheKey = `pergenres:${pageType}:${language}:${region}:${with_genres}:${sort_by}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const selectedGenre = Number(with_genres);


    const certification = mapCertificationGenre(pageType, selectedGenre, region);



    const adjustedGenre =
      pageType === "tv" ? mapMovieGenreToTvGenre(selectedGenre) : selectedGenre;

    const without_genres = buildWithoutGenres(pageType, adjustedGenre);
    const include_adult = "false";

    const data = await tmdbRepository.fetchPerGenres(
      pageType,
      language,
      adjustedGenre.toString(),
      without_genres,
      include_adult,
      certification,
      sort_by,
      region,
      page
    );

    const medias = data.results.slice(0, 20);
    cache.set(cacheKey, medias);

    return medias;
  }







  async getImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesResponse<ImagesInterface>> {
    const cacheKey = `images:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesResponse<ImagesInterface>>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(mediaId, mediaType, language, originalLanguage);

    cache.set(cacheKey, data);

    return data;
  }


  async getPosterImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesInterface | null> {
    const cacheKey = `posters:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesInterface | null>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const normalizedLanguage = language.includes("-")
      ? language.split("-")[0]
      : language;

    let posters: ImagesInterface[] = [];

    posters = data.posters.filter((p) => p.iso_639_1 === null);



    if (posters.length === 0) {
      posters = data.posters.filter((p) => p.iso_639_1 === normalizedLanguage);
    }

    if (posters.length === 0) {
      posters = data.posters.filter((p) => p.iso_639_1 === "en");
    }

    if (posters.length === 0 && originalLanguage) {
      posters = data.posters.filter((p) => p.iso_639_1 === originalLanguage);
    }

    if (posters.length === 0 && data.posters.length > 0) {
      posters = data.posters;
    }

    let poster: ImagesInterface | null = null;
    if (posters.length > 0) {
      poster = posters.reduce((prev, curr) =>
        (curr.vote_average ?? 0) > (prev.vote_average ?? 0) ? curr : prev
      );
    }

    cache.set(cacheKey, poster || null);

    return poster || null;
  }











  async getBackdropImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesInterface | null> {
    const cacheKey = `backdrops:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesInterface | null>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const normalizedLanguage = language.includes("-")
      ? language.split("-")[0]
      : language;

    let backdrops = data.backdrops.filter(
      (b: ImagesInterface) => b.iso_639_1 === normalizedLanguage
    );

    if (backdrops.length === 0) {
      backdrops = data.backdrops.filter(
        (b: ImagesInterface) => b.iso_639_1 === "en"
      );
    }

    if (backdrops.length === 0 && originalLanguage) {
      backdrops = data.backdrops.filter(
        (b: ImagesInterface) => b.iso_639_1 === originalLanguage
      );
    }

    if (backdrops.length === 0 && data.backdrops.length > 0) {
      backdrops = data.backdrops;
    }

    let backdrop: ImagesInterface | null = null;
    if (backdrops.length > 0) {
      backdrop = backdrops.reduce((prev, curr) =>
        (curr.vote_average ?? 0) > (prev.vote_average ?? 0) ? curr : prev
      );
    }

    cache.set(cacheKey, backdrop || null);

    return backdrop || null;
  }

  async getPosterAndLogoById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<{ poster: ImagesInterface | null; logo: ImagesInterface | null }> {
    const cacheKey = `poster_logo:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<{ poster: ImagesInterface | null; logo: ImagesInterface | null }>(cacheKey);
    if (cached) return cached;

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const poster = selectBestImage(data.posters, language, originalLanguage, "poster");
    const logo = selectBestImage(data.logos, language, originalLanguage, "logo");

    const result = { poster, logo };
    cache.set(cacheKey, result);

    return result;
  }






  async getLogoImagesById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<ImagesInterface | null> {
    const cacheKey = `logos:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<ImagesInterface | null>(cacheKey);
    if (cached) return cached;

    const data = await tmdbRepository.fetchImagesById(
      mediaId,
      mediaType,
      language,
      originalLanguage
    );

    const logo = selectBestImage(data.logos, language, originalLanguage, "logo");
    cache.set(cacheKey, logo || null);

    return logo || null;
  }




  async getVideoById(
    mediaId: number,
    mediaType: string,
    language: string,
    originalLanguage: string
  ): Promise<string | null | false> {
    const cacheKey = `videos:${mediaType}:${mediaId}:${language}:${originalLanguage}`;
    const cached = cache.get<string | null | false>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchVideoById(mediaId, mediaType, language);
    const results = data.results;

    let resultado = await videoFilter(results, language, originalLanguage);


    if (resultado === null && originalLanguage !== "en-US") {
      const dataFallback = await tmdbRepository.fetchVideoById(mediaId, mediaType, originalLanguage);
      const resultsFallback = dataFallback.results;
      resultado = await videoFilter(resultsFallback, originalLanguage, originalLanguage);
    }

    if (resultado === null && language !== "en-US" && originalLanguage !== "en-US") {
      const dataEn = await tmdbRepository.fetchVideoById(mediaId, mediaType, "en-US");
      const resultsEn = dataEn.results;
      resultado = await videoFilter(resultsEn, "en-US", originalLanguage);
    }

    cache.set(cacheKey, resultado);

    return resultado;
  }


  async getSearchMulti(
    query: string,
    language: string,
    page: number = 1
  ): Promise<TMDBMedia[]> {
    const cacheKey = `searchmulti:${query}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);

    if (cached) {
      return cached;
    }



    const data = await tmdbRepository.fetchSearchMulti(
      query,
      language,
      page
    );

    const medias = data.results;
    cache.set(cacheKey, medias);

    return medias;
  }

  async getSearchPerson(
    person_id: number,
    language: string,
  ): Promise<TMDBPersonResponse> {
    const cacheKey = `searchperson:${person_id}:${language}`;
    const cached = cache.get<TMDBPersonResponse>(cacheKey);

    if (cached) return cached;

    const append_to_response = "movie_credits,tv_credits";

    const data = await tmdbRepository.fetchSearchPerson(
      person_id,
      language,
      append_to_response,
    );

    cache.set(cacheKey, data);

    return data;
  }

  async getGenres(
    pageType: "movie" | "tv",
    language: string
  ): Promise<TMDBGenre[]> {
    const cacheKey = `genres:${pageType}:${language}`;
    const cached = cache.get<TMDBGenre[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await tmdbRepository.fetchGenres(pageType, language);
    const genres = data.genres;
    cache.set(cacheKey, genres);

    return genres;
  }

  async getClassification(
    mediaType: "movie" | "tv",
    mediaId: number,
    language: string
  ): Promise<any> {
    const cacheKey = `classification:${mediaType}${mediaId}:${language}`;
    const cached = cache.get<any>(cacheKey);

    if (cached) {
      return cached;
    }

    const country = language.split("-")[1];

    let data;
    if (mediaType === "movie") {
      data = await tmdbRepository.fetchClassificationMovie(mediaId);
    } else {
      data = await tmdbRepository.fetchClassificationTv(mediaId);
    }


    const classification = data.results.find(
      (item: any) => item.iso_3166_1 === country
    );

    cache.set(cacheKey, classification);

    return classification;
  }

  async getSeason(tvId: number, seasonNumber: number, language: string) {
    const cacheKey = `season:${tvId}:${seasonNumber}:${language}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const seasonData = await tmdbRepository.fetchSeason(tvId, seasonNumber, language);

    const filtered = {
      name: seasonData.name,
      season_number: seasonData.season_number,
      episodes: seasonData.episodes
        .map((ep) => ({
          still_path: ep.still_path,
          runtime: ep.runtime,
          overview: ep.overview,
          name: ep.name,
          episode_number: ep.episode_number,
        })),
    };

    cache.set(cacheKey, filtered);
    return filtered;
  }


  async getList(
    list_id: number,
    language: string,
    page: number,
  ): Promise<TMDBMedia[]> {
    const cacheKey = `list:${list_id}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);
    if (cached) return cached;

    const list = await tmdbRepository.fetchList(list_id, language, page);

    const data = list.items || [];
    cache.set(cacheKey, data, 60 * 5);

    return data;
  }

  async getCollection(
    collection_id: number,
    language: string,
    page: number,
  ): Promise<TMDBMedia[]> {
    const cacheKey = `collection:${collection_id}:${language}:${page}`;
    const cached = cache.get<TMDBMedia[]>(cacheKey);
    if (cached) return cached;

    const list = await tmdbRepository.fetchCollection(collection_id, language, page);

    const data = list.parts || [];
    cache.set(cacheKey, data, 60 * 5);

    return data;
  }




}

export default new TMDBService();
