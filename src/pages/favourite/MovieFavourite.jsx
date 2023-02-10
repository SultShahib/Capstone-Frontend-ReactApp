import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-favourite.scss';

import MovieCard from '../../components/movie-card/MovieCard';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import CustomPagination from '../../components/pagination/CustomPagination';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import MovieList from '../../components/movie-list/MovieList';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import MovieFavouriteList from './MovieFavouriteList';

const MovieFavourite = (props) => {
  const [items, setItems] = useState();
  const [allMovieIMDBID, setAllMovieIMDBID] = useState();
  const [allMovieData, setAllMovieData] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  let numOfMovies = 20;
  const currentStackOfMovies = page * numOfMovies;
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);

  const { keyword } = useParams();
  const { userid } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      setLoading(true);
      setAllMovieData('');
      setItems('');
      response = await axios.get(
        `http://localhost:8082/api/v1/favourite/getFavouriteMovies/${userid}`
      );
      // break;
      setAllMovieData('');
      setItems('');
      setLoading(true);
      console.log('@@Getting search results@@');

      console.log(response);

      setAllMovieIMDBID(response);

      const getMovieData = await Promise.all(
        response &&
          response?.data?.map(async (id) => {
            const movieResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
            );
            return movieResponse.data;
          })
      );

      console.log('@@Getting search results@@');
      console.log('@@Search results movie data', getMovieData);
      setItems(getMovieData);
      setLoading(false);
      //   setTotalPage(response.total_pages);
    };

    getList();
  }, [hasFetchedData, props.refresh]);

  console.log('@@Items', items);

  return (
    <>
      <div className='section mb-3'></div>
      <div className='movie-grid'>
        {loading && <Loading />}
        {items &&
          items.map((item, i) => (
            <MovieCard
              category={'movie'}
              item={item}
              key={i}
              userid={props.userid}
            />
          ))}
      </div>

      <div className='section mb-3'>
        <div className='section__header mb-2'>
          <h2>Similar movies you may like</h2>
          {/* <Loading /> */}
        </div>
        {similarLoading ? <Loading /> : <p> </p>}
        {items &&
          items?.map((item, i) => {
            console.log('@@item', item);
            return (
              <MovieFavouriteList
                setLoading={setLoading}
                loading={loading}
                setSimilarLoading={setSimilarLoading}
                similarLoading={similarLoading}
                category={category}
                type='similar'
                userid={userid}
                id={item.id}
                title={item.original_title}
              />
            );
          })}
      </div>
    </>
  );
};

export default MovieFavourite;
