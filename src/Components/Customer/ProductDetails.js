import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleProduct/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    const history = useHistory();
    const order = (id) => {
        const url = `/placeOrder/${id}`;
        history.push(url);
    }
    
    return (
        <div>
        <Header></Header>
           <div className="container my-5">
               <div className="row" style={{ margin:"100px auto" }}>
               <h3 className='fw-bold text uppercase text center' >Product Details</h3>
                   <div className="col-6">
                       <img src={product.image} height="300px" width="300px" alt="" />
                        <h2>{product.name}</h2>
                   </div>
                   <div className="col-6">
                       <h3 className='my-3'>Category: {product.category}</h3>
                       <h3>Available: {product.quantity}</h3>
                       <h4 className='fw-bold text-danger my-4'>Price: {product.price}</h4>
                       <div className="ms-auto my-5">
                                <button onClick={() => order(product.id)}  className="btn btn-primary btn-sm ms-auto">Buy Now</button>
                        </div>
                   </div>
               </div>
           </div>
           <Footer></Footer>
        </div>
    );
};

export default ProductDetails;