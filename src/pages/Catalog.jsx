import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Catalog = () => {
  const { category, userid } = useParams();
  console.log('@@Catalog', category, userid);
  const [refresh, setRefresh] = useState(false);
  console.log('@@Props.refresh@@', refresh);

  return (
    <>
      <Header userid={userid} />
      <PageHeader userid={userid} setRefresh={setRefresh}>
        Movies
      </PageHeader>
      <div className='container'>
        <div className='section mb-3'>
          <MovieGrid
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

export default Catalog;
