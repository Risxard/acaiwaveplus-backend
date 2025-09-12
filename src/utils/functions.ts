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
        withoutArray = [878, 10770, 99, 10752, 36, 28];
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



export default buildWithoutGenres