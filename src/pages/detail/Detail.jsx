import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import tmdbApi from '../../api/tmdbApi';
import apiConfig2 from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import Loading from '../../components/loading/Loading';

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDetail = async () => {
      // await tmdbApi.detail(category, id, {params:{}});
      const response = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
      );
      setItem(response.data);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className='banner'
            style={{
              backgroundImage: `url(${
                item &&
                apiConfig2.originalImage(item.backdrop_path || item.poster_path)
              })`,
            }}
          ></div>
          <div className='mb-3 movie-content container'>
            <div className='movie-content__poster'>
              <div
                className='movie-content__poster__img'
                style={{
                  backgroundImage: `url(${
                    item &&
                    apiConfig2.originalImage(
                      item.poster_path || item.backdrop_path
                    )
                  })`,
                }}
              ></div>
            </div>
            <div className='movie-content__info'>
              <h1 className='title'>{item.title || item.name}</h1>
              <div className='genres'>
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className='genres__item'>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className='overview'>{item.overview}</p>
              <div className='cast'>
                <div className='section__header'>
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='section mb-3'>
              <VideoList id={item.id} />
            </div>
            <div className='section mb-3'>
              <div className='section__header mb-2'>
                <h2>Similar movies you may like</h2>
                {/* <Loading /> */}
              </div>
              {loading ? <Loading /> : <p> </p>}
              <MovieList
                setLoading={setLoading}
                category={category}
                type='similar'
                id={item.id}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
