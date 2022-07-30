import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SellerSidebar from './SellerSidebar';

const SellerProducts = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const [productList, setProductList] = useState([]);
    const sellerId = localStorage.getItem('id');
    useEffect(() => {
        axios.get(`/api/sellerProducts/${sellerId}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setProductList(response.data);
            }
        })
    }, [sellerId]);

    const history = useHistory();
    const update = (id) => {
        const url = `/updateProduct/${id}`;
        history.push(url);
    }
    //delete
    const deleteProduct = async (event, id) => {
        const response = await axios.delete(`/api/deleteProduct/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    const productReview = (id) => {
        const url = `/productReview/${id}`;
        history.push(url);
    }

    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'seller' ?
                    <div>
                        <div className="row">
                            <SellerSidebar></SellerSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,  #FCEDB2,#DEFCFA" }}>
                                <h3 className="mt-5 text-uppercase fw-bold">My Products</h3>
                                {
                                    loading ?
                                        (
                                            <div className="loading-bg">
                                                <div className="d-flex justify-content-center align-items-center text-center" >
                                                    <div className="">
                                                        <div className="">
                                                            <h5 className="fw-bold text-uppercase" style={{ color: "red" }}>
                                                                <span><span className="mx-2">Loading</span>
                                                                    <PulseLoader className="App" size={10} color={"red"} loading={loading} />
                                                                    <PulseLoader className="App" size={10} color={"red"} loading={loading} />
                                                                </span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) :

                                        (
                                            <div>
                                                <table className="table table-striped table-hover">
                                                    <thead className="bg-dark text-white text-center">
                                                        <tr >
                                                            <th>Product Id</th>
                                                            <th>Name</th>
                                                            <th>Category</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Image</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        productList.map(product =>

                                                            <tbody className="text-center">

                                                                <tr>
                                                                    <td>{product.id}</td>
                                                                    <td>{product.name}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>{product.price}</td>
                                                                    <td><img src={product.image} height="50px" width="50px" alt="" /></td>
                                                                    <td >
                                                                        <button className="mt-2 btn btn-sm btn-primary mx-1" onClick={() => productReview(product.id)}>Reviews</button>
                                                                        <button className="mt-2 btn btn-sm btn-warning" onClick={() => update(product.id)}>Update</button>
                                                                        <button className="mt-2 btn btn-sm btn-danger mx-1" onClick={(event) => deleteProduct(event, product.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-success btn-sm' to="/addProduct">Add Product</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <Error></Error>
            }
            <Footer></Footer>
        </section>
    );
};

export default SellerProducts;