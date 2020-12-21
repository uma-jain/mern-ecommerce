import React from 'react';

import Rate from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function Rating(props) {
  const { rating, numReviews } = props;
  //console.log(rating);

  return (
    <div className="">
     <Box component="fieldset" mb={3} borderColor="transparent">        
     <Rate name="read-only" value={rating} readOnly /><br/>
      <span>{numReviews + ' reviews'}</span>
      </Box>
       
    </div>
  );
}