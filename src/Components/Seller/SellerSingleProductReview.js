import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SellerSidebar from './SellerSidebar';

const SellerSingleProductReview = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [productReview, setProductReview] = useState([]);

    useEffect(() => {
        axios.get(`/api/productRatingsAPI/${id}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setProductReview(response.data);
            }
        })
    }, [id]);
    const deleteReview = async (event, id) => {
        const response = await axios.delete(`/api/deleteProductReview/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    const history = useHistory();
    const sellerProducts = () => {
        let sellerId = localStorage.getItem('id');
        history.push(`/sellerProducts/${sellerId}`);
    }
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'seller' ?
                    <div>
                        <div className="row">
                            <SellerSidebar></SellerSidebar>
                            <div className="col-9">
                                <h3 className="mt-5 text-uppercase fw-bold">My Products Reviews</h3>
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
                                                            <th>Review Id</th>
                                                            <th>Customer Name</th>
                                                            <th>Comment</th>
                                                            <th>Rating</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        productReview.map(review =>
                                                            <tbody className="text-center">
                                                                <tr>
                                                                    <td>{review.id}</td>
                                                                    <td>{review.customerName}</td>
                                                                    <td>{review.review}</td>
                                                                    <td className='fw-bold text-danger'>{review.rating} Star</td>
                                                                    <td >
                                                                        <button className=" btn btn-sm btn-danger mx-1" onClick={(event) => deleteReview(event, review.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <button className='btn btn-danger btn-sm px-3' onClick={sellerProducts}>Back</button>
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

export default SellerSingleProductReview;