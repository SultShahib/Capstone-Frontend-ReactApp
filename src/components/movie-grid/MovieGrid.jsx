import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import CustomPagination from '../../components/pagination/CustomPagination';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import axios from 'axios';

const MovieGrid = (props) => {
  const [items, setItems] = useState();
  const [allMovieIMDBID, setAllMovieIMDBID] = useState();
  const [allMovieData, setAllMovieData] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const numOfMovies = 20;
  const currentStackOfMovies = page * numOfMovies;
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const { keyword } = useParams();
  //   console.log('@@Keyword@@', keyword);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        response = await tmdbApi.getMoviesList(450);
        // break;
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }

      console.log('@@response', response);
      setAllMovieIMDBID(response);

      const getMovieData = await Promise.all(
        response?.map(async (id) => {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
          );
          return movieResponse.data;
        })
      );

      setAllMovieData(getMovieData);

      setTotalPage(20);
      setAllMovieData(getMovieData);
      setItems(
        getMovieData.slice(
          currentStackOfMovies,
          currentStackOfMovies + numOfMovies
        )
      );
      //   setTotalPage(response.total_pages);
    };

    if (!hasFetchedData) {
      getList();
      setHasFetchedData(false);
    }
  }, [hasFetchedData]);

  const settingPagination = () => {
    // setMovieData(getMovieData.slice(0, 20));
    // setNumOfPages(movieData?.length / 20);

    console.log('@@@@ Previous data @@@@@@');
    console.log(items);
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

  return (
    <>
      <div className='section mb-3'>
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className='movie-grid'>
        {items &&
          items.map((item, i) => (
            <MovieCard category={props.category} item={item} key={i} />
          ))}
      </div>
      {/* {page < totalPage ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null} */}
      <CustomPagination setPage={setPage} numOfPages={totalPage} page={page} />
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
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
