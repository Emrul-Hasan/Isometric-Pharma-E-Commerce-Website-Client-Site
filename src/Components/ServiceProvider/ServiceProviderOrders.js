import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ServiceProviderSidebar from './ServiceProviderSidebar';

const ServiceProviderOrders = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        axios.get(`/api/serviceProviderOrders/`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setOrderList(response.data);
            }
        })
    }, []);

    const history = useHistory();
    const delivery = (id) => {
        const url = `/addToDelivery/${id}`;
        history.push(url);
    }
    
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'service' ?
                    <div>
                        <div className="row">
                            <ServiceProviderSidebar></ServiceProviderSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,#D0FFDC,#D0E1FF)"}}>
                                <h3 className="mt-5 text-uppercase fw-bold">All Orders</h3>
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
                                                            <th>Order Id</th>
                                                            <th>Product Name</th>
                                                            <th>Address</th>
                                                            <th>Phone</th>
                                                            <th>Status</th>
                                                            <th>Price</th>
                                                            <th>Method</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        orderList.map(order =>

                                                            <tbody className="text-center">

                                                                {
                                                                    order.status === 'Accept' ?
                                                                        (
                                                                            <tr>
                                                                                <td>{order.id}</td>
                                                                                <td>{order.productName}</td>
                                                                                <td>{order.Address}</td>
                                                                                <td>{order.phone}</td>
                                                                                <td className='fw-bold text-danger'>{order.status}</td>
                                                                                <td>{order.price}</td>
                                                                                <td>{order.method}</td>
                                                                                <td >

                                                                                    <button className=" btn btn-sm btn-warning" onClick={() => delivery(order.id)}>Delivery</button>

                                                                                </td>
                                                                            </tr>
                                                                        ) : null
                                                                }

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
        </section>
    );
};

export default ServiceProviderOrders;