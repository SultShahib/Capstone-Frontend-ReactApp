import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

import PageHeader from '../../components/page-header/PageHeader';

import MovieGrid from '../../components/movie-grid/MovieGrid';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import MovieFavourite from './MovieFavourite';

const Favourite = () => {
  const { category, userid } = useParams();
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Header userid={userid} />
      <PageHeader userid={userid} setRefresh={setRefresh}>
        Favourites
      </PageHeader>
      <div className='container'>
        <div className='section mb-3'>
          <MovieFavourite
            refresh={refresh}
            setRefresh={setRefresh}
            category={category}
            userid={userid}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favourite;
