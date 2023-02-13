import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import PageHeader from '../../components/page-header/PageHeader';
import DeleteMovieGrid from './DeleteMovieGrid';

const DeleteMovie = () => {
  const { userid } = useParams();
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <Header />
      <PageHeader setRefresh={setRefresh} userid={userid}>
        Delete Movie
      </PageHeader>{' '}
      <div className='container'>
        <div className='section mb-3'>
          <DeleteMovieGrid />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteMovie;
