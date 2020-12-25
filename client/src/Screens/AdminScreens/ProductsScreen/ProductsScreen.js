import React, { useEffect, useState } from 'react';
import {  connect } from 'react-redux';

import "./ProductScreen.css"
import Loading from "../../../components/Loading/LoadingBox";
import MessageBox from "../../../components/ErrorBox/ErrorBox"

import { storage } from "../../../firebase/firebase"



import { saveProduct,getAllProducts,deleteProdcut } from "../../../redux/actionCreator/ProductActions";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);  
  const [image, setImage] = useState('');
  const [preview, setpreview] = useState(null);

  const uploadFileHandler = (e) => {
    setpreview(URL.createObjectURL(e.target.files[0]) )
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    /*axios
      .post('/api/uploadimage', bodyFormData, {
        headers: {
          "x-auth-token": localStorage.getItem("token") 
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });*/
      const uploadTask = storage.ref(`/mernsocialmedia/posts/${file.name}`).put(file)
        uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
       console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
         
        storage.ref('mernsocialmedia/posts').child(file.name).getDownloadURL()
         .then(fireBaseUrl => {
          console.log("url is ",fireBaseUrl); 
          setImage(fireBaseUrl);
          setUploading(false); 
               })
      })

  };

  const { loading, Allproducts:products, product_fetching_error } = props.productList;

  const { loading: loadingSave, success: successSave, error: errorSave } = props.productSave;


  const { loading: loadingDelete, success: successDelete, error: errorDelete } = props.productDelete;
  
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);    }
        props.getAllProducts()
   
  }, [loadingSave, loadingDelete]);

  
  useEffect(() => {
    if(!props.user.userInfo){
      props.history.push("/")
    }
  }, [props.user.userInfo]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    props.saveProduct({
      _id: id,
      name, price, image, brand, category,
      countInStock, description
    });
    setModalVisible(false)
  }
  const deleteHandler = (product) => {
  props.deleteProdcut(product._id);
  setModalVisible(false)
  }
  return  !props.user.loading && props.user.userInfo && !props.user.userInfo.isAdmin ? <div> you are not allowed to access this page</div> : <div className="content content-margined">
  {loadingSave || loadingDelete  && <Loading></Loading>}
    {product_fetching_error && <MessageBox msg={props.product_fetching_error} type="1"></MessageBox>}
    {errorSave && <MessageBox msg={props.errorSave} type="1"></MessageBox>}
    {errorDelete && <MessageBox msg={props.errorDelete} type="1"></MessageBox>}

    <div className="product-header">
      <h3>Products</h3>
      <button className="button primary" style={{width:"180px"}} onClick={() => openModal({})}>Create Product</button>
    </div>
    {modalVisible &&
      <div className="form">
        <form onSubmit={submitHandler}  >
          <ul className="form-container">
            <li>
              <h2>Create Product</h2>
            </li>
            <li>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
            </li>

            <li>
              <label htmlFor="name">
                Name
          </label>
              <input type="text"  name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} required>
              </input>
            </li>
            <li>
              <label htmlFor="price">
                Price
          </label>
              <input type="text" name="price"   type="number" value={price} id="price" onChange={(e) => setPrice(e.target.value)} required>
              </input>
            </li>
            <li>
            <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => {
                    setImage(e.target.value)
                    setpreview(URL.createObjectURL(e.target.files[0]) )
                  }               
                  }
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {
                preview && <img style={{width:300,height:300,padding:'0 20px'}} src={preview}/>
                }
                {uploading && <div>Uploading...</div>}
            </li>
            <li>
              <label htmlFor="brand">
                Brand
          </label>
              <input type="text" name="brand"  value={brand} id="brand" onChange={(e) => setBrand(e.target.value)} required>
              </input>
            </li>
            <li>
              <label htmlFor="countInStock">
                CountInStock
          </label>
              <input type="text" name="countInStock"   type="number" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)} required>
              </input>
            </li>
            <li>
              <label htmlFor="name">
                Category
          </label>
              <input type="text" name="category"  value={category} id="category" onChange={(e) => setCategory(e.target.value)} required>
              </input>
            </li>
            <li>
              <label htmlFor="description">
                Description
          </label>
              <textarea name="description"   value={description} id="description" onChange={(e) => setDescription(e.target.value)} ></textarea>
            </li>
            <li>
              <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
            </li>
            <li>
              <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
            </li>
          </ul>
        </form>
      </div>
    }


    <div className="product-list">
    {loading&& <Loading></Loading>}
      {  !loading && products && !products[0] && <div>No Products</div> }
      <table className="table">
      { !loading&& products && products[0]&& <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>}
        <tbody>
          { !loading&& products && products.map(product => (<tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>
              <button className="button" onClick={() => openModal(product)} >Edit</button>
              {' '}
              <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </div>
}

const mapStateToProps=({user,productDelete,productSave,productList})=>{
    return {
        user:user,
        productDelete:productDelete,
        productSave:productSave,
        productList:productList
    }
} 

export default connect(mapStateToProps,{saveProduct,getAllProducts,deleteProdcut})(ProductsScreen);