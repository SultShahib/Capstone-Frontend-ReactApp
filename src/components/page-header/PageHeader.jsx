import React from 'react';

import './page-header.scss';

import bg from '../../assets/footer-bg.jpg';

const PageHeader = (props) => {
  const refreshResult = () => {
    props.setRefresh((prevData) => !prevData);
  };
  return (
    <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
      <h2 onClick={refreshResult}>{props.children}</h2>
    </div>
  );
};

export default PageHeader;
