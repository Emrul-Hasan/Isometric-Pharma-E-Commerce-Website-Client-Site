import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CustomerSidebar from './CustomerSidebar';

const CustomerServiceReview = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [serviceReview, setServiceReview] = useState([]);
    const customerId = localStorage.getItem('id');
    useEffect(() => {
        axios.get(`/api/customerServiceReview/${customerId}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setServiceReview(response.data);
            }
        })
    }, [customerId]);

    const history = useHistory();
    const update = (id) => {
        const url = `/updateServiceReview/${id}`;
        history.push(url);
    }
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
                localStorage.getItem('role') === 'customer' ?
                    <div>
                        <div className="row">
                            <CustomerSidebar></CustomerSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,  #F5AAAA,#A5F6CE)"}}>
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
                                                            <th>Service Provider</th>
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
                                                                    <td>{review.s_ProviderName}</td>
                                                                    <td>{review.review}</td>
                                                                    <td className='fw-bold text-danger'>{review.rating} Star</td>

                                                                    <td >

                                                                        <button className=" btn btn-sm btn-warning" onClick={() => update(review.id)}>Update</button>
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

export default CustomerServiceReview;