import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import './admin-movie-grid.scss';

import MovieCard from '../../components/movie-card/MovieCard';

import tmdbApi from '../../api/tmdbApi';
import axios from 'axios';
import Loading from '../../components/loading/Loading';

const AdminMovieGrid = (props) => {
  const [items, setItems] = useState();
  const [allMovieData, setAllMovieData] = useState();
  const [loading, setLoading] = useState(false);
  const [movieId, setMovieId] = useState('');
  const [validMovieId, setValidMovieId] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [adminMovies, setAdminMovies] = useState();

  const { userid } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      setLoading(true);
      setAllMovieData('');
      setItems('');
      setAdminMovies('');
      response = await tmdbApi.getMoviesList(5);
      const getAdminMovies = await tmdbApi.getAdminMovies();

      const getMovieData = await Promise.all(
        response?.map(async (id) => {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
          );
          return movieResponse.data;
        })
      );
      const getAdminMovieData = await Promise.all(
        getAdminMovies?.map(async (id) => {
          const movieResponseAdmin = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
          );
          return movieResponseAdmin.data;
        })
      );

      setAdminMovies(getAdminMovieData);
      setItems(getMovieData);
      setLoading(false);
    };
    getList();
  }, [props.refresh, refresh]);

  useEffect(() => {
    setValidMovieId(movieId.length !== 0);
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRefresh((prevData) => !prevData);

    try {
      await axios.post(
        `http://localhost:8080/api/v2/RecommendSystem/saveAdminMovie/${movieId}`,
        JSON.stringify({ movieId }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      }
    }
  };

  return (
    <>
      <div className='add-movies-section'>
        <section>
          <h1>AddMovies</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='movieid'>Movie TMDBID</label>
            <input
              type='text'
              id='movieid'
              autoComplete='off'
              onChange={(e) => setMovieId(e.target.value)}
              value={movieId}
              required
              aria-describedby='uidnote'
            />

            <button disabled={!validMovieId ? true : false}>Add Movie</button>
          </form>
          <span className='line'>
            <a href={`/dashboard/${userid}`}>Back to dashboard</a>
          </span>
        </section>
      </div>
      <div className='movie-grid'>
        {loading && <Loading />}
        {items &&
          items.map((item, i) => (
            <MovieCard category={'movie'} item={item} key={i} userid={userid} />
          ))}

        {adminMovies &&
          adminMovies.map((item, i) => (
            <MovieCard category={'movie'} item={item} key={i} userid={userid} />
          ))}
      </div>
    </>
  );
};

export default AdminMovieGrid;
