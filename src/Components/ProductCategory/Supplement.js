import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Supplement = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then(res => res.json())
            .then(getData => setProduct(getData[2]));
    }, []);
    return (
        <div>
            <Header></Header>
            <div className='my-5 container'>
                <h3 className="my-5 pt-5 fw-bold text-uppercase text-center">Supplement Category</h3>
                <div className="row">
                    {
                        product.map(products =>
                            products.category === 'Supplement' ?
                                <div className="col-3" style={{ margin: "0 auto" }}>
                                    <div className="card-group">
                                        <div className="card">
                                            <img src={products.image} height="200" width="200" alt="" className="card-img-top" />
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <h5 class="card-title text-primary">{products.name}</h5>
                                                    <h6 class="card-title ms-auto mt-1">{products.category}</h6>
                                                </div>
                                                <span></span>
                                                <div class="d-flex">
                                                    <p class="card-text"><small class="text-danger fw-bold">Price:
                                                        {products.price}</small></p>
                                                    <p class="card-text  ms-auto"><small class="text-muted">Available:
                                                        {products.quantity}</small></p>
                                                </div>
                                                <div class="d-flex">
                                                    <p>Author: {products.sellerName}</p>
                                                    <div class="ms-auto">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        )
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Supplement;