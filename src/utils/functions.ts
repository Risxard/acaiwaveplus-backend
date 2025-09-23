export function mapCertificationGenre(
  pageType: "movie" | "tv",
  movieGenreId: number,
  region: string,
): string {
  const movieMap: Record<string, Record<number, string>> = {
    US: {
      10749: "PG-13", // Romance
      18: "R",        // Drama
      99: "PG",       // Documentário
    },
    BR: {
      10749: "12",
      18: "16",
      99: "10",
    },
    ES: {
      10749: "12",
      18: "16",
      99: "12",
    },
  };

  const tvMap: Record<string, Record<number, string>> = {
    US: {
      10749: "TV-14", // Romance
      18: "TV-MA",    // Drama
      99: "TV-PG",    // Documentário
    },
    BR: {
      10749: "12",
      18: "16",
      99: "10",
    },
    ES: {
      10749: "12",
      18: "16",
      99: "12",
    },
  };

  const mapping = pageType === "movie" ? movieMap[region] : tvMap[region];

  return mapping?.[movieGenreId] ?? "";
}





export function mapMovieGenreToTvGenre(movieGenreId: number): number {
  const mapping: Record<number, number> = {
    28: 10759, // Action -> Action & Adventure
    12: 10759, // Adventure -> Action & Adventure
    878: 10765, // Science Fiction -> Sci-Fi & Fantasy
    14: 10765, // Fantasy -> Sci-Fi & Fantasy
    10752: 10768, // War -> War & Politics
    36: 18, // History -> Drama
    27: 18, // Horror -> Drama (não tem equivalente)
    53: 9648, // Thriller -> Mystery
    10402: 35, // Music -> Comedy (não tem equivalente real)
    10770: 10762, // TV Movie -> Kids (não tem equivalente real)
  };

  return mapping[movieGenreId] ?? movieGenreId;
}


export function mapTvGenreToMovieGenre(tvGenreId: number): number {
  const mapping: Record<number, number> = {
    10759: 28, // Action & Adventure -> Action
    10765: 878, // Sci-Fi & Fantasy -> Science Fiction
    10768: 10752, // War & Politics -> War
    10762: 10751, // Kids -> Family
    37: 37, // Western -> Western
  };

  return mapping[tvGenreId] ?? tvGenreId;
}


export function buildWithoutGenres(
  pageType: "movie" | "tv",
  selectedGenre: number
): string {
  let withoutArray: number[] = [];

  if (pageType === "movie") {
    switch (selectedGenre) {
      case 28:
        withoutArray = [16, 99];
        break;
      case 35:
        withoutArray = [16, 10770, 28, 99];
        break;
      case 80:
        withoutArray = [35, 16, 99];
        break;
      case 18:
        withoutArray = [99, 10752];
        break;
      case 9648:
        withoutArray = [16, 27];
        break;
      case 53:
        withoutArray = [16, 27, 28];
        break;
      default:
        withoutArray = [];
    }
  }

  if (pageType === "tv") {
    switch (selectedGenre) {
      case 10759:
        withoutArray = [16];
        break;
      case 35:
        withoutArray = [16];
        break;
      case 80:
        withoutArray = [16];
        break;
      case 18:
        withoutArray = [16, 35];
        break;
      case 9648:
        withoutArray = [35];
        break;
      default:
        withoutArray = [];
    }
  }

  return withoutArray.join(",");
}
