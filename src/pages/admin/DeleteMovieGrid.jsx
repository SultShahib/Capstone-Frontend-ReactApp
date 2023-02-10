import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './admin-movie-grid.scss';

import MovieCard from '../../components/movie-card/MovieCard';
import CustomPagination from '../../components/pagination/CustomPagination';
import AdminMoveCard from './AdminMovieCard';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import axios from 'axios';
import Loading from '../../components/loading/Loading';

const DeleteMovieGrid = (props) => {
  const [items, setItems] = useState();
  const [allMovieIMDBID, setAllMovieIMDBID] = useState();
  const [allMovieData, setAllMovieData] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  let numOfMovies = 20;
  const currentStackOfMovies = page * numOfMovies;
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieId, setMovieId] = useState('');
  const [validMovieTitle, setValidMovieTitle] = useState(false);
  const [validMovieId, setValidMovieId] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [adminMovies, setAdminMovies] = useState();

  const { keyword, userid } = useParams();
  console.log('@@Keyword@@', keyword);
  console.log('@@props.userid@@', props.userid);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      setLoading(true);
      setAllMovieData('');
      setItems('');
      response = await tmdbApi.getMoviesList(5);
      const getAdminMovies = await tmdbApi.getAdminMovies();
      setAllMovieIMDBID(response);
      setAdminMovies(getAdminMovies);

      console.log('@@Adminmvoies', getAdminMovies);
      console.log('@@response', response);

      const getMovieData = await Promise.all(
        response?.map(async (id) => {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
          );
          return movieResponse.data;
        })
      );
      //   setTotalPage(response.total_pages);
    };

    if (!hasFetchedData) {
      getList();
      setHasFetchedData(false);
    }
  }, [hasFetchedData, props.refresh, refresh]);

  useEffect(() => {
    setValidMovieTitle(movieTitle.length !== 0);
    setValidMovieId(movieId.length !== 0);
  }, [validMovieTitle, movieId]);

  console.log(validMovieTitle, validMovieId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    setRefresh((prevData) => !prevData);

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/RecommendSystem/deleteAdminMovie/${movieTitle}`,
        JSON.stringify({ validMovieTitle }),
        {
          headers: { 'Content-Type': 'application/json' },
          //   withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(response?.data);
      console.log(response?.data);
      //console.log(JSON.stringify(response))
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      }
    }
  };

  console.log('@@Items', items);

  return (
    <>
      <div className='add-movies-section'>
        <section>
          <h1>Delete Movies</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='movietitle'>Movie title</label>
            <input
              type='text'
              id='movietitle'
              autoComplete='off'
              onChange={(e) => setMovieTitle(e.target.value)}
              value={movieTitle}
              required
              aria-describedby='uidnote'
            />

            <label htmlFor='movieid'>Movie ID</label>
            <input
              type='text'
              id='movieid'
              autoComplete='off'
              onChange={(e) => setMovieId(e.target.value)}
              value={movieId}
              required
              aria-describedby='uidnote'
            />
            <button disabled={!validMovieTitle || !validMovieId ? true : false}>
              Delete Movie
            </button>
          </form>

          <span className='line'>
            {/*put router link here*/}
            <a href={`/dashboard/${userid}`}>Back to dashboard</a>
          </span>
        </section>
      </div>
      <div className='movie-grid'>
        {loading && <Loading />}
        {items &&
          items.map((item, i) => (
            <MovieCard
              category={props.category}
              item={item}
              key={i}
              userid={props.userid}
            />
          ))}

        {adminMovies &&
          adminMovies.map((item, i) => <AdminMoveCard title={item} />)}
      </div>
    </>
  );
};

export default DeleteMovieGrid;
