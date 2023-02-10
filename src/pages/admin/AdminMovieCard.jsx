import React from 'react';

import '../../components/movie-card/movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../../components/button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const AdminMovieCard = (props) => {
  const item = props.item;

  const link =
    '/' + category[props.category] + '/' + props.userid + '/' + item.id;

  const bg = apiConfig.w500Image(
    (item && item.poster_path) || (item && item.backdrop_path)
  );

  return (
    <Link to={link}>
      <div className='movie-card' style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className='bx bx-play'></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default AdminMovieCard;
