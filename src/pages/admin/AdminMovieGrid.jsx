import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './admin-movie-grid.scss';

import MovieCard from '../../components/movie-card/MovieCard';
import CustomPagination from '../../components/pagination/CustomPagination';
import AdminMoveCard from './AdminMovieCard';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import axios from 'axios';
import Loading from '../../components/loading/Loading';

const AdminMovieGrid = (props) => {
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
  const [genres, setGenres] = useState('');
  const [movieId, setMovieId] = useState('');
  const [validMovieTitle, setValidMovieTitle] = useState(false);
  const [validGenre, setValidGenre] = useState(false);
  const [validMovieId, setValidMovieId] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [adminMovies, setAdminMovies] = useState();

  const { keyword, userid } = useParams();
  console.log('@@Keyword@@', keyword);
  console.log('@@userid@@', userid);
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
      const getAdminMovieData = await Promise.all(
        getAdminMovies?.map(async (id) => {
          const movieResponseAdmin = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
          );
          return movieResponseAdmin.data;
        })
      );

      setAdminMovies(getAdminMovieData);

      if (getMovieData.length > 20) {
        setTotalPage(20);
        setAllMovieData(getMovieData);
        setItems(
          getMovieData.slice(
            currentStackOfMovies,
            currentStackOfMovies + numOfMovies
          )
        );
        setLoading(false);
      } else {
        numOfMovies = getMovieData.length;
        setTotalPage(getMovieData.length);
        setAllMovieData(getMovieData);
        setItems(getMovieData.slice(0, currentStackOfMovies + numOfMovies));
        setLoading(false);
      }
      //   setTotalPage(response.total_pages);
    };

    if (!hasFetchedData) {
      getList();
      setHasFetchedData(false);
    }
  }, [hasFetchedData, props.refresh, refresh]);

  const settingPagination = () => {
    // setMovieData(getMovieData.slice(0, 20));
    // setNumOfPages(movieData?.length / 20);
    setItems(
      allMovieData.slice(
        currentStackOfMovies,
        currentStackOfMovies + numOfMovies
      )
    );
  };

  useEffect(() => {
    if (allMovieData) {
      settingPagination();
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setValidMovieTitle(movieTitle.length !== 0);
    setValidGenre(genres.length !== 0);
    setValidMovieId(movieId.length !== 0);
  }, [validMovieTitle, genres, movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    setRefresh((prevData) => !prevData);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v2/RecommendSystem/saveAdminMovie/${movieId}`,
        JSON.stringify({ validMovieTitle, genres, movieId }),
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
          adminMovies.map((item, i) => (
            <MovieCard
              category={props.category}
              item={item}
              key={i}
              userid={props.userid}
            />
          ))}
      </div>
      {/* {page < totalPage ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null} */}
      {/* <CustomPagination setPage={setPage} numOfPages={totalPage} page={page} /> */}
    </>
  );
};

export default AdminMovieGrid;
