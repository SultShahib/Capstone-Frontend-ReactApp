import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import CustomPagination from '../../components/pagination/CustomPagination';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import axios from 'axios';
import Loading from '../loading/Loading';

const MovieGrid = (props) => {
  const [items, setItems] = useState();
  const [allMovieIMDBID, setAllMovieIMDBID] = useState();
  const [allMovieData, setAllMovieData] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  let numOfMovies = 20;
  const currentStackOfMovies = page * numOfMovies;
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loading, setLoading] = useState(false);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        setLoading(true);
        setAllMovieData('');
        setItems('');
        response = await tmdbApi.getMoviesList(450);
      } else {
        setAllMovieData('');
        setItems('');
        setLoading(true);
        response = await tmdbApi.search(props.category, keyword);
      }
      console.log('@@response', response);

      setAllMovieIMDBID(response);

      const getMovieData = await Promise.all(
        response &&
          response?.map(async (id) => {
            const movieResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
            );
            return movieResponse.data;
          })
      );

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
    };

    if (!hasFetchedData) {
      getList();
      setHasFetchedData(false);
    }
  }, [hasFetchedData, props.refresh]);

  const settingPagination = () => {
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

  console.log('@@Items', items);

  return (
    <>
      <div className='section mb-3'>
        <MovieSearch
          setRefresh={props.setRefresh}
          category={props.category}
          keyword={keyword}
          userid={props.userid}
        />
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
      </div>
      <CustomPagination setPage={setPage} numOfPages={totalPage} page={page} />
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(
        `/${category[props.category]}/${props.userid}/search/${keyword}`
      );
    }

    props.setRefresh((prevData) => !prevData);
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className='movie-search'>
      <Input
        type='text'
        placeholder='Enter keyword'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className='small' onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
