import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../movie-card/MovieCard';
import Loading from '../loading/Loading';

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  const isLoadingTrue = () => props.setLoading(true);
  const isLoadingFalse = () => props.setLoading(false);

  useEffect(() => {
    const getList = async () => {
      props.setLoading(true);
      setItems('');
      const params = {};

      // if (props.type !== 'similar') {
      //     switch(props.category) {
      //         case category.movie:
      //             response = await tmdbApi.getMoviesList(props.type, {params});
      //             break;
      //         default:
      //             response = await tmdbApi.getTvList(props.type, {params});
      //     }
      // } else {
      //     response = await tmdbApi.similar(props.category, props.id);
      // }

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

        console.log('@@GetSImilarmovieData@@', getMovieData);
        setItems(getMovieData);
      } catch (error) {
        console.log('X|X ERROR X|X');
        console.log(error);
      }
      props.setLoading(false);
    };
    getList();
  }, [props.id]);

  return (
    <div className='movie-list'>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items &&
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
