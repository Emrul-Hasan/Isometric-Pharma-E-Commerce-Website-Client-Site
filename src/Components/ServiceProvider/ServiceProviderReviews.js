import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ServiceProviderSidebar from './ServiceProviderSidebar';

const ServiceProviderReviews = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [serviceReview, setServiceReview] = useState([]);
    const serviceId = localStorage.getItem('id');
    useEffect(() => {
        axios.get(`/api/s_ProviderServiceReview/${serviceId}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setServiceReview(response.data);
            }
        })
    }, [serviceId]);


    //delete
    const deleteReview = async (event, id) => {
        const response = await axios.delete(`/api/deleteServiceReview/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'service' ?
                    <div>
                        <div className="row">
                            <ServiceProviderSidebar></ServiceProviderSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,#D0FFDC,#D0E1FF)"}}>
                                <h3 className="mt-5 text-uppercase fw-bold">My Service Reviews</h3>
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
                                                        serviceReview.map(review =>
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
                                <Link className='btn btn-info btn-sm' to="/dashboard">Home</Link>
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

export default ServiceProviderReviews;