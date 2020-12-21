import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating1 from '../../components/Ratings/RatingProduct';
import RatingProduct from '../../components/Ratings/RatingProduct';
import { getProductDetails,saveProductReview} from "../../redux/actionCreator/ProductActions";
import {connect  } from "react-redux";


import Loading from "../../components/Loading/LoadingBox";
import MessageBox from "../../components/ErrorBox/ErrorBox"

import "./ProductScreen.css"

import Rating  from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

 function ProductScreen(props) {

  
  const {loading:{reviewLoading},success} =props.productReviewSave
  useEffect(() => {
   //alert(props.match.params.id);
   async function getdata(){
       props.getProductDetails(props.match.params.id);
   }
   getdata();
  }, [success])
  
const [qty, setQty] = useState(1);
const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { userInfo } = props.user;


const submitHandler = (e) => {
  e.preventDefault();
  // dispatch actions
 props.saveProductReview(props.match.params.id, {
      name: userInfo.name,
      rating: rating,
      comment: comment,
    })
    setRating(0);
    setComment('')

};
  const {product,productLoading,product_fetching_error} =props;

  if (!product && !productLoading) {
    return <div> Product Not Found</div>;
  }
     return  (
    <div>
    {productLoading && <Loading></Loading>}
    {reviewLoading && <Loading></Loading>}
    {product_fetching_error && <MessageBox msg={props.error} type="1"></MessageBox>}
    {!productLoading &&
    <div>
     <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img className="pro_image" src={product.image} alt={product.name}></img>
        </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
              <Rating1
                rating={Math.floor(product.rating)}
                numReviews={product.numReviews}
              ></Rating1>
            </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: {product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <Link to={`/cart/${product._id}/${qty}`}>
                    <button
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
      </div>
      <div className="content-margined">
            <h2>Reviews</h2>
            {!product && !product.reviews &&!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
        
              {product && product.reviews && product.reviews.map((review) => (
                
                <li key={review._id}>
                  <div>{review.name}</div>
                  
                    <RatingProduct rating={review.rating}></RatingProduct>
                  
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
                
              ))}
              
              {product && product.reviews && product.reviews.map((review) => (
                
                console.log(review.rating) 
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                       <Box  borderColor="transparent">
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      size="large"
                      onChange={(event, newValue) => {
                        setRating(newValue);                       
                      }}
                    /></Box>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div> 
          </div>}
    </div>
    
  );
}
const mapStateToProps=({productDetails,user,productReviewSaveReducer})=>{
   return {product:productDetails.product,
  productLoading:productDetails.loading,
  product_fetching_error:productDetails.error,
  user:user,
  productReviewSave:productReviewSaveReducer
}

}
export default (connect(mapStateToProps,{getProductDetails,saveProductReview})(ProductScreen))