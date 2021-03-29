import React,{useEffect,useState}from 'react';
import Product from '../../components/Item/Item';
import { connect } from 'react-redux';
import Loading from "../../components/Loading/LoadingBox";
import {getAllProducts} from "../../redux/actionCreator/ProductActions"
import { get } from 'lodash';
import MessageBox from "../../components/ErrorBox/ErrorBox"
import "./HomeScreen.css"
import { Link } from 'react-router-dom';


 function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  
  useEffect(() => {  
    async function getdata(){
        props.getAllProducts(category);
    }
    getdata()
   
  }, [category])
  
  useEffect(() => {  
    props.getAllProducts(category, searchKeyword, sortOrder)
   
  }, [sortOrder])
  
  const submitHandler = (e) => {
    e.preventDefault();
   props.getAllProducts(category, searchKeyword, sortOrder)
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
   
  }

  return (
    <div>
    {category &&
    <div>
    <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      <h2>{category}</h2>
      </div>
      }    

   { !category &&
    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </li>
      <li>
       <p className="sortby"> Sort By {' '} </p>
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </li>
    </ul>}
    {props.loading && <Loading></Loading>}
    {props.error && <MessageBox msg={props.error} type="1"></MessageBox>}
    {!props.laoding &&
     <div className="row center">
        { props.products&& props.products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
   }
   </div>
  );
}
const MapStateToProps=({productList})=>{
  return {
  products:productList.Allproducts,
  error:productList.error_fetching_products,
  loading:productList.loading
   }
  
}
export default connect(MapStateToProps,{getAllProducts})(HomeScreen);