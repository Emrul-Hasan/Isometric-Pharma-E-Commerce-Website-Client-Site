/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useHistory } from 'react-router-dom';


const AllProductCard = (props) => {

    const { name, category, quantity, price, image, sellerName, id } = props.product;
    const history = useHistory();
    const details = (id) => {
        const url = `/productDetails/${id}`;
        history.push(url);
    }

    return (

        <div className="col-3 oishi">
            <div className="card-group">
                <div className="card">
                    <img src={image} height="200" width="200" alt="" className="card-img-top" />
                    <div className="card-body">
                        <div className="d-flex">
                            <h5 className="card-title text-primary">{name}</h5>
                            <h6 className="card-title ms-auto mt-1">{category}</h6>
                        </div>
                        <span></span>
                        <div className="d-flex">
                            <p className="card-text"><small className="text-danger fw-bold">Price:
                                {price}</small></p>
                            <p className="card-text  ms-auto"><small className="text-muted">Available:
                                {quantity}</small></p>
                        </div>
                        <div className="d-flex">
                            <p>Author: {sellerName}</p>
                            <div className="ms-auto">
                                <button onClick={() => details(id)} className="btn btn-primary btn-sm ms-auto">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default AllProductCard;