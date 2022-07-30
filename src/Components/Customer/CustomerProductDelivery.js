import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CustomerSidebar from './CustomerSidebar';

const CustomerProductDelivery = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [deliveryList, setDeliveryList] = useState([]);
    useEffect(() => {
        axios.get(`/api/getCustomerDeliveries`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setDeliveryList(response.data);
            }
        })
    }, []);

    const history = useHistory();
    const review = (id) => {
        const url = `/addServiceRating/${id}`;
        history.push(url);
    }
    //delete
    
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'customer' ?
                    <div>
                        <div className="row">
                            <CustomerSidebar></CustomerSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,  #F5AAAA,#A5F6CE)"}}>
                                <h3 className="mt-5 text-uppercase fw-bold">My Order Deliveries</h3>
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
                                                            <th>Delivery Id</th>
                                                            <th>Product Name</th>
                                                            <th>Service Provider</th>
                                                            <th>Address</th>
                                                            <th>Status</th>
                                                            <th>Comment</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        deliveryList.map(delivery =>

                                                            <tbody className="text-center">
                                                                <tr>
                                                                    <td>{delivery.id}</td>
                                                                    <td>{delivery.productName}</td>
                                                                    <td>{delivery.s_ProviderName}</td>
                                                                    <td>{delivery.Address}</td>
                                                                    <td>{delivery.status}</td>
                                                                    <td>{delivery.comment}</td>
                                                                    <td >

                                                                        <button className=" btn btn-sm btn-primary" onClick={() => review(delivery.id)}>Review</button>
                                                                      
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

export default CustomerProductDelivery;