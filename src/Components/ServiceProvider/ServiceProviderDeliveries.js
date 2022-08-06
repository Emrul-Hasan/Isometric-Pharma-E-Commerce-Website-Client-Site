import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ServiceProviderSidebar from './ServiceProviderSidebar';

const ServiceProviderDeliveries = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [deliveryList, setDeliveryList] = useState([]);
    const serviceId = localStorage.getItem('id');
    useEffect(() => {
        axios.get(`/api/serviceProviderDeliveries/${serviceId}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setDeliveryList(response.data);
            }
        })
    }, [serviceId]);

    const history = useHistory();
    const update = (id) => {
        const url = `/updateDelivery/${id}`;
        history.push(url);
    }
    //delete
    const deleteDelivery = async (event, id) => {
        const response = await axios.delete(`/api/deleteDelivery/${id}`);
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
                                <h3 className="mt-5 text-uppercase fw-bold">My All Deliveries</h3>
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
                                                                    <td>{delivery.Address}</td>
                                                                    <td>{delivery.status}</td>
                                                                    <td>{delivery.comment}</td>
                                                                    <td >

                                                                        <button className=" btn btn-sm btn-warning" onClick={() => update(delivery.id)}>Update</button>
                                                                        <button className=" btn btn-sm btn-danger mx-1" onClick={(event) => deleteDelivery(event, delivery.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-info btn-sm' to="/serviceProviderOrders">Take Order</Link>
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

export default ServiceProviderDeliveries;