import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const AddProduct = () => {

    // set image to imgbb.com
    const [imageURL, setImageURL] = useState(null);
    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', '0bdc42b3cf235e6981d19573c2c5875f');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setImageURL(response.data.data.display_url);
                swal("Success", "Image uploaded successfully!", "success");
            })
    };

    const history = useHistory();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        productDetails: '',
        sellerName: '',
        sellerNumber: '',
        sellerId: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setProduct({ ...product, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            name: product.name,
            category: product.category,
            quantity: product.quantity,
            price: product.price,
            image: imageURL,
            productDetails: product.productDetails,
            sellerName: localStorage.getItem('name'),
            sellerNumber: localStorage.getItem('phone'),
            sellerId: localStorage.getItem('id'),
        };
        axios.post(`api/addProduct`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setProduct({ ...product, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                let sellerId = localStorage.getItem('id');
                swal("Success", response.data.success, "success");
                history.push(`/sellerProducts/${sellerId}`);
            }
        });
    }
    const sellerProducts = () => {
        let getSellerId = localStorage.getItem('id');
        history.push(`/sellerProducts/${getSellerId}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>

                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <h3 className='text-center text-uppercase fw-bold'>Add Product</h3>
                    <form onSubmit={Submit} encType='multiple/form-data'>

                        <input type="text" onChange={handelChange} placeholder='Name' name="name" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.name}</span>

                        <input type="text" onChange={handelChange} placeholder='Quantity' name="quantity" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.quantity}</span>

                        <select onChange={handelChange} required name="category" className='my-2 w-100'>
                            <option defaultValue="">Category</option>
                            <option defaultValue="Herbals">Herbals</option>
                            <option defaultValue="Supplement">Supplement</option>
                            <option defaultValue="Personal">Personal</option>
                            <option defaultValue="Medicine">Medicine</option>
                        </select>
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.category}</span>

                        <input type="text" onChange={handelChange} placeholder='Price' name="price" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.price}</span>

                        <input type="text" onChange={handelChange} placeholder='Product Details' name="productDetails" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{product.errors.productDetails}</span>

                        <input type="file" required onChange={handleImageUpload} className="w-100 my-2" />

                        <br />
                        <button type="submit" className='w-25 btn btn-sm btn-success mt-4' >Add</button>
                        <button onClick={sellerProducts} style={{ textAlign: "left" }} className="btn btn-danger  mt-4 btn-sm px-3 mx-5">Back</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;