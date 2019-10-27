const { flattenById } = require('./dataUtils');

describe('flattenById', () => {
  it('should have two entries when ids are different', () => {
    const inputAccumulator = {
      '1': {
        movieId: '1',
        movieName: 'Kung fu Panda',
        movieImage: 'http://www.fakeSite.org/falseImage1.jpg'
      }
    };

    const inputValue = {
      id: '2',
      movie_name: 'Kung fu Panda 2',
      image: 'http://www.fakeSite.org/falseImage2.jpg'
    };

    expect(flattenById(inputAccumulator, inputValue)).toEqual({
      '1': {
        movieId: '1',
        movieName: 'Kung fu Panda',
        movieImage: 'http://www.fakeSite.org/falseImage1.jpg'
      },
      '2': {
        movieId: '2',
        movieName: 'Kung fu Panda 2',
        movieImage: 'http://www.fakeSite.org/falseImage2.jpg'
      }
    });
  });

  it('should have one entry when ids are the same', () => {
    const inputAccumulator = {
      '1': {
        movieId: '1',
        movieName: 'Kung fu Panda',
        movieImage: 'http://www.fakeSite.org/falseImage1.jpg'
      }
    };

    const inputValue = {
      id: '1',
      movie_name: 'Kung fu Panda',
      image: 'http://www.fakeSite.org/falseImage1.jpg'
    };

    expect(flattenById(inputAccumulator, inputValue)).toEqual({
      '1': {
        movieId: '1',
        movieName: 'Kung fu Panda',
        movieImage: 'http://www.fakeSite.org/falseImage1.jpg'
      }
    });
  });
});
