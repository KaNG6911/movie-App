export const Popular = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzc3OTUwODE0N2JiYzM1ZjE2YmIwZWJjYWIxM2I4ZSIsIm5iZiI6MTc2NjU2NTY4Ny4zMjYwMDAyLCJzdWIiOiI2OTRiYTczNzZiNGZmMGM1YjAwNzNmOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OKb9Eg4IJbemSQSfFD-_RJpllzTax-vHrEFubkjctWE",
      },
    }
  );

  const data = await response.json();
  return data.results;
};

export const Upcoming = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzc3OTUwODE0N2JiYzM1ZjE2YmIwZWJjYWIxM2I4ZSIsIm5iZiI6MTc2NjU2NTY4Ny4zMjYwMDAyLCJzdWIiOiI2OTRiYTczNzZiNGZmMGM1YjAwNzNmOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OKb9Eg4IJbemSQSfFD-_RJpllzTax-vHrEFubkjctWE",
      },
    }
  );

  const data = await response.json();
  return data.results;
};

export const TopRated = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzc3OTUwODE0N2JiYzM1ZjE2YmIwZWJjYWIxM2I4ZSIsIm5iZiI6MTc2NjU2NTY4Ny4zMjYwMDAyLCJzdWIiOiI2OTRiYTczNzZiNGZmMGM1YjAwNzNmOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OKb9Eg4IJbemSQSfFD-_RJpllzTax-vHrEFubkjctWE",
      },
    }
  );

  const data = await response.json();
  return data.results;
};
