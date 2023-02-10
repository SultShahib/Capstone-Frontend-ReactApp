import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import './groupOrientation.scss';

export default function GroupOrientation({ userid }) {
  const buttons = [
    <Link to={`/dashboard/addMovie/${userid}`}>
      <Button className='button-link' key='one'>
        Add Movie
      </Button>
    </Link>,
    <Link to={`/dashboard/deleteMovie/${userid}`}>
      <Button className='button-link' key='two'>
        Delete Movie
      </Button>
    </Link>,
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation='vertical'
        aria-label='vertical contained button group'
        variant='contained'
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
