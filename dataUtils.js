const flattenById = (acc, val) => ({
  ...acc,
  [val.id]: {
    movieId: val.id,
    movieName: val.movie_name,
    movieImage: val.image
  }
});

const joinPropertyReducer = property => (acc, val) => {
  if (acc[val.id]) {
    const existingMovieWithPropertyArray = {
      ...acc,
      [val.id]: {
        [`${property}s`]: { ...acc[val.id][`${property}s`], [val[property]]: 1 }
      }
    };
    return existingMovieWithPropertyArray;
  } else {
    const newMovieWithPropertyArray = {
      ...acc,
      [val.id]: {
        [`${property}s`]: { [val[property]]: 1 }
      }
    };
    return newMovieWithPropertyArray;
  }
};

module.exports = {
  flattenById,
  joinPropertyReducer
};
