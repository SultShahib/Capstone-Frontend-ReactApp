const apiConfig = {
  baseUrl: 'http://localhost:8080/',
  //   baseUrl: 'https://api.themoviedb.org/3/',
  // apiKey: '5e83d3463b244867eab265ed5e141d03',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
