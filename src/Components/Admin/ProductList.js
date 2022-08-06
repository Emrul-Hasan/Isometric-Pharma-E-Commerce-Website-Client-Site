import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SellerSidebar from '../Seller/SellerSidebar';
import AdminSidebar from './AdminSidebar';

const ProductList = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        axios.get("/api/products").then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                setProductList(response.data[2]);
            }
        })
    }, []);
    // delete product

    const deleteProduct = async (event, id) => {
        const response = await axios.delete(`/api/deleteProduct/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    // update product
    const history = useHistory();
    const update = (id) => {
        const url = `/updateProduct/${id}`;
        history.push(url);
    }
    return (
        <div>
            <Header></Header>
            {
                localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'seller' ?
                    <div>
                        <div className="row">
                            {localStorage.getItem('role') === 'admin' ?
                                <AdminSidebar></AdminSidebar>
                                :
                                <SellerSidebar></SellerSidebar>
                            }
                            <div className="col-9" style={{ background: "linear-gradient(45deg,#F5AAAA,#6EDBFC)" }}>
                                <h3 className="mt-5 text-uppercase fw-bold">Product List</h3>
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
                                                            <th >Product Id</th>
                                                            <th >Product Name</th>
                                                            <th >Seller Name</th>
                                                            <th>Category</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Image</th>
                                                            {
                                                                localStorage.getItem('role') === 'admin' ?
                                                                    (
                                                                        <div>
                                                                            <th>Seller Name</th>
                                                                            <th className='px-5'>Action</th>
                                                                        </div>
                                                                    ) :
                                                                    null
                                                            }
                                                        </tr>
                                                    </thead>
                                                    {
                                                        productList.map(product =>
                                                            <tbody className="text-center">
                                                                <tr>
                                                                    <td>{product.id}</td>
                                                                    <td>{product.name}</td>
                                                                    <td>{product.sellerName}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>{product.price}</td>
                                                                    <td><img src={product.image} alt="" height="50px" width="50px" /></td>

                                                                    {
                                                                        localStorage.getItem('role') === 'admin' ?
                                                                            (
                                                                                <div>
                                                                                    <td className='px-3'>{product.sellerName}</td>
                                                                                    <td>
                                                                                        <button className="btn btn-sm btn-info ml-5 mx-1 mt-2" >Orders</button>
                                                                                        <button className="mt-2 btn btn-sm btn-warning" onClick={() => update(product.id)}>Update</button>
                                                                                        <button className="mt-2 btn btn-sm btn-danger mx-1" onClick={(event) => deleteProduct(event, product.id)}>Delete</button>
                                                                                    </td>
                                                                                </div>
                                                                            ) :
                                                                            null
                                                                    }

                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>

                                            </div>
                                        )
                                }

                            </div>
                        </div>
                    </div>

                    :
                    <Error></Error>
            }
            <Footer></Footer>
        </div>
    );
};

export default ProductList;