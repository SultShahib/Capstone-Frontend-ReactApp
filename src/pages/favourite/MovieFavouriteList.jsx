import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './movieFavouriteList.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../../components/button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../../components/movie-card/MovieCard';
import Loading from '../../components/loading/Loading';

const MovieFavouriteList = (props) => {
  const loading = props.loading;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getList = async () => {
      props.setLoading(true);
      props.setSimilarLoading(true);
      setItems('');

      try {
        const response = await tmdbApi.getSimilarMoviesList(props.id);
        setItems('');
        const getMovieData = await Promise.all(
          response?.map(async (id) => {
            const movieResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
            );
            return movieResponse.data;
          })
        );

        setItems(getMovieData);
        props.setLoading(false);
        props.setSimilarLoading(false);
      } catch (error) {
        console.log('X|X ERROR X|X');
        console.log(error);
      }
    };
    getList();
  }, [props.id]);

  return (
    <div className='movie-list'>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items
          ? items.map((item, i) => (
              <SwiperSlide key={i}>
                <MovieCard
                  item={item}
                  category={'movie'}
                  userid={props.userid}
                  key={i}
                />
              </SwiperSlide>
            ))
          : loading && <Loading />}
        {items.length === 0 && (
          <div className='section__header mb-2'>
            {!props.similarLoading && !items ? (
              <h2>No similar movies for {props.title}</h2>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </Swiper>
    </div>
  );
};

MovieFavouriteList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieFavouriteList;
