import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './login.css';

import axios from 'axios';
const LOGIN_URL = 'api/v1/login';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8082/${LOGIN_URL}/${email}/${pwd}`,
        JSON.stringify({ email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setUserData(response.data);
      setEmail('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Incorrect Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Incorrect Email');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className='App'>
      {success && userData.appUserRole === 'ADMIN' ? (
        <section>
          <h1>Welcome Admin!</h1>
          <br />
          <Link to={`/dashboard/${userData.id}`}>
            <p>Click to go to Admin page page</p>
          </Link>
        </section>
      ) : success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <Link to={`/movie/${userData.id}`}>
            <p>Click to go to home page</p>
          </Link>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              id='email'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className='line'>
              <a href='/register'>Register</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
