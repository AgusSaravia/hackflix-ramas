// src/utils/ratingMapping.js (puedes crear este archivo para mantener organizada la lógica)
export const mapStarsToVoteAverage = (stars) => {
  switch (stars) {
    case 1:
      return 3;
    case 2:
      return 5;
    case 3:
      return 6;
    case 4:
      return 7;
    case 5:
      return 9;
    default:
      return 0; // Sin filtro
  }
};
