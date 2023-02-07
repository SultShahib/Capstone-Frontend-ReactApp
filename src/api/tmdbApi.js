import axiosClient from './axiosClient';
import axios from 'axios';
import axiosClientTMDB from './axiosClientTMDB';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
};

const tmdbApi = {
  getMoviesList: (type) => {
    const url = 'api/v2/RecommendSystem/getAllMovies/' + type;
    return axiosClient.get(url);
  },
  getSimilarMoviesList: (type) => {
    const url = 'api/v2/RecommendSystem/getSimilarMoviesTMDBID/' + type;
    return axiosClient.get(url);
  },
  getTvList: (type, params) => {
    const url = 'tv/' + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosClientTMDB.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = 'search/' + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    // return axiosClient.get(url, params);
    // apiKey: '5e83d3463b244867eab265ed5e141d03',
    return axios.get(`'https://api.themoviedb.org/3/${url}`);
    //   baseUrl: 'https://api.themoviedb.org/3/',
  },
  credits: (cate, id) => {
    const url = category[cate] + '/' + id + '/credits';
    // return axios.get(`'https://api.themoviedb.org/3/${url}`);
    return axiosClientTMDB.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
