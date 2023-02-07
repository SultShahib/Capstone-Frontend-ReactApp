import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// CustomPagination renders the number of pages availible depending on the API call

export default function CustomPagination({ setPage, numOfPages, page }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0 10px 0',
      }}
    >
      <Stack spacing={2}>
        <Pagination
          style={{
            backgroundColor: 'white',
            color: 'white',
          }}
          count={numOfPages}
          onChange={(e) => handlePageChange(Number(e.target.innerText))}
          page={page}
          hideNextButton
          hidePrevButton
          shape='rounded'
        />
      </Stack>
    </div>
  );
}
