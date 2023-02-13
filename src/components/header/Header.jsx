import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

const headerNav = [
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'Logout',
    path: '/',
  },
  {
    display: 'Favourite',
    path: '/favourite',
  },
];

const Header = ({ userid }) => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (!headerRef.current) return;
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
          <Link to={`/movie/${userid}`}>🎥 Shahib's Movies 🍿</Link>
        </div>
        <ul className='header__nav'>
          <li>
            <Link to={`${headerNav[0].path}/${userid}`}>
              {headerNav[0].display}
            </Link>
          </li>
          <li>
            <Link to={`${headerNav[1].path}`}>{headerNav[1].display}</Link>
          </li>
          <li>
            <Link to={`${headerNav[2].path}/${userid}`}>
              {headerNav[2].display}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
