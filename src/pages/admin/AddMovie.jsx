import { useScrollTrigger } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MovieGrid from '../../components/movie-grid/MovieGrid';
import PageHeader from '../../components/page-header/PageHeader';
import AdminMovieGrid from './AdminMovieGrid';

const AddMovie = () => {
  const { userid } = useParams();
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <Header />
      <PageHeader setRefresh={setRefresh} userid={userid}>
        Add Movies
      </PageHeader>{' '}
      <div className='container'>
        <div className='section mb-3'>
          <AdminMovieGrid />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddMovie;
