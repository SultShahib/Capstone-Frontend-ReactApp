import './loading.scss';

const Loading = () => {
  return (
    <>
      <div className='section__header mb-2'>
        <h2>Loading Movies...</h2>
      </div>
      <div id='outer'>
        <div id='middle'>
          <div id='inner'></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
