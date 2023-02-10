import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './admin-header.scss';

import logo from '../../assets/tmovie.png';

const headerNav = [
  {
    display: 'Logout',
    path: '/',
  },
];

const AdminHeader = ({ userid }) => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='logo'>
          <Link to={`/`}>🎥 Admins's Dashboard 🍿</Link>
        </div>
        <ul className='header__nav'>
          <li>
            <Link to={`${headerNav[0].path}`}>{headerNav[0].display}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
