import React from 'react';

import Rate from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function Rating(props) {
  const { rating, numReviews } = props;
  //console.log(rating);

  return (
    <div >
     <Box component="fieldset" mb={3} borderColor="transparent" style={{margin:'0',padding:0,border :"none"}}>        
     <Rate name="read-only" value={rating} readOnly /><br/>
      <span>{numReviews + ' reviews'}</span>
      </Box>
       
    </div>
  );
}