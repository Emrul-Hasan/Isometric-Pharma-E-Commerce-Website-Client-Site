import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleProduct/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>

                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <form action="http://127.0.0.1:8000/api/updateProductAPI" method='post'>
                        <h3 className='text-center text-uppercase fw-bold'>Update Product</h3>
                        <input className='my-2 w-100' hidden required type="text" defaultValue={product.id} name="id" />
                        <input className='my-2  w-100' hidden required type="text" defaultValue={localStorage.getItem('role')} name="role" />
                        <input className='my-2  w-100' required type="text" defaultValue={product.name} name="name" />
                        <input className='my-2  w-100' required type="text" defaultValue={product.quantity} name="quantity" />
                        <input className='my-2  w-100' required type="text" defaultValue={product.price} name="price" />
                        <input className='my-2  w-100' required type="text" defaultValue={product.productDetails} name="productDetails" />
                        <button className='my-2  w-25 btn btn-success btn-sm' type="submit"  >Update</button>
                        <button className='btn btn-sm btn-danger px-3 mx-5' to="/sellerList">Back </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;