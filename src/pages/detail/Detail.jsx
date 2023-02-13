import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import apiConfig2 from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import Loading from '../../components/loading/Loading';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

const Detail = () => {
  const { category, id, userid } = useParams();
  const para = useParams();

  console.log('@@details page@@', para);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favouriteExists, setFavouriteExists] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const checkForFavourite = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/favourite/checkFavouriteMovie/${id}/${userid}`
      );
      console.log('@@Check favourite@@', response);
      if (response.data == null) {
        setFavouriteExists(false);
      } else {
        setFavouriteExists(true);
      }
    } catch (err) {
      console.log('||| ERROR |||');
      console.log(err);
    }
  };

  const getDetail = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${category}/${id}?api_key=5e83d3463b244867eab265ed5e141d03&language=en-US`
    );
    setItem(response.data);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    checkForFavourite();
    getDetail();
  }, [category, id, refresh, favouriteExists]);

  const addToFavourite = async () => {
    let response;
    checkForFavourite();
    setRefresh((prevData) => !prevData);
    try {
      if (favouriteExists === false) {
        response = await axios.post(
          `http://localhost:8082/api/v1/favourite/addFavourite/${id}/${userid}`,
          JSON.stringify({ id, userid }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        setFavouriteExists(true);
      } else {
        response = await axios.delete(
          `http://localhost:8082/api/v1/favourite/deleteFavouriteMovie/${id}/${userid}`
        );
        setFavouriteExists(false);
      }
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log('||| ERROR |||');
      console.log(err);
    }
  };

  return (
    <>
      <Header userid={userid} />
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
              <button
                className='genres__item__favourite'
                onClick={addToFavourite}
              >
                {favouriteExists === true
                  ? 'Delete from favourites'
                  : 'Add to favourites'}
                <svg
                  className='genres__item__favourite__heart'
                  width='1em'
                  height='1em'
                  viewBox='0 0 16 16'
                  class='bi bi-heart-fill'
                  fill='red'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                  />
                </svg>
              </button>
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
              </div>
              {loading ? <Loading /> : <p> </p>}
              <MovieList
                setLoading={setLoading}
                category={category}
                type='similar'
                userid={userid}
                id={item.id}
              />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Detail;
