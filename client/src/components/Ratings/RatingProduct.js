import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function RatingProduct(props) {
  const { rating,  } = props;
  console.log(rating);
  return (
    <>
     <Box  borderColor="transparent">        
        <Rating name="read-only" value={rating} readOnly /><br/>
      </Box>
    </>
  );
}
