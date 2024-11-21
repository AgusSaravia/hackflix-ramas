/**
 * Will map rating from 1-10 scale to a 1-5 scale using linear transformation
 *
  @param {number} oldRating - So be its vote_average (1-10)
  @returns {number} - mapped rating (1-5)
 */

export const mapRatingToFive = (oldRating: number) => {
  if (oldRating < 1 || oldRating > 10) {
    console.log(typeof oldRating, oldRating);
    throw new Error("Rating MUST be between 1 and 10");
  }
  return (1 + ((oldRating - 1) * 4) / 9).toFixed(1);
};
