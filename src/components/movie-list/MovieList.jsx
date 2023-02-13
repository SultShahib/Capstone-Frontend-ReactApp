import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      props.setLoading(true);
      setSimilarLoading(true);
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
        setSimilarLoading(false);
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
              <MovieCard
                item={item}
                category={props.category}
                userid={props.userid}
              />
            </SwiperSlide>
          ))}
        {items.length === 0 && (
          <div className='section__header mb-2'>
            {!similarLoading && <h2>No similar movies</h2>}
          </div>
        )}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
