import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AdminSidebar from './AdminSidebar';

const SellerProductList = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        axios.get(`/api/sellerProducts/${id}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setProductList(response.data);
            }
        })
    }, [id]);

    //delete
    const deleteProduct = async (event, id) => {
        const response = await axios.delete(`/api/deleteProduct/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };

    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'admin' ?
                    <div>
                        <div className="row">
                            <AdminSidebar></AdminSidebar>
                            <div className="col-9" style={{ background: "linear-gradient(45deg,#F5AAAA,#6EDBFC)" }}>
                                <h3 className="mt-5 fw-bold text-danger">Seller Id {id}'s all product</h3>
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
                                                            <th>Product Name</th>
                                                            <th>Seller Name</th>
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
                                                                    <td>{product.sellerName}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.quantity}</td>
                                                                    <td>{product.price}</td>
                                                                    <td><img src={product.image} height="50px" width="50px" alt="" /></td>
                                                                    <td >
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
                                <Link className='btn btn-success px-3 btn-sm' to="/sellerList">Back</Link>
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

export default SellerProductList;