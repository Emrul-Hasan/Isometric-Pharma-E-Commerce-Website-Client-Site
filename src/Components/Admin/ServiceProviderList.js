import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AdminSidebar from './AdminSidebar';

const ServiceProviderList = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [serviceProviderList, setServiceProviderList] = useState([]);

    useEffect(() => {
        axios.get("/api/serviceProviderList").then(response => {
            if(response.data.error){
                swal("Warning", "Invalid Token!", "error");
            }else{
                setServiceProviderList(response.data);
            }
        })
    }, []);
    const deleteUser = async (event, id) => {
        const response = await axios.delete(`/api/deleteServiceProvider/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    const history = useHistory();
    const updateUser = (id) => {
        const url = `/updateServiceProvider/${id}`;
        history.push(url);
    }
    const serviceProviderDeliveries = (id) => {
        const url = `/serviceProviderDeliveryList/${id}`;
        history.push(url);
    }
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'admin' ?
                    <div>
                        <div className="row">
                            <AdminSidebar></AdminSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,#F5AAAA,#6EDBFC)" }}>
                                <h3 className="mt-5 text-uppercase fw-bold">Service Provider List</h3>
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
                                                            <th >Id</th>
                                                            <th >Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Address</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        serviceProviderList.map(service =>

                                                            <tbody className="text-center">

                                                                <tr>
                                                                    <td>{service.id}</td>
                                                                    <td>{service.name}</td>
                                                                    <td>{service.email}</td>
                                                                    <td>{service.phone}</td>
                                                                    <td>{service.address}</td>
                                                                    {
                                                                        service.status === 'Pending' ?
                                                                            (
                                                                                <td style={{ color: "red" }} className="fw-bold">{service.status}</td>
                                                                            ) :
                                                                            <td className="fw-bold">{service.status}</td>
                                                                    }
                                                                    <td>
                                                                    <button className="btn btn-sm btn-primary mx-1" onClick={() => serviceProviderDeliveries(service.id)}>Deliveries</button>
                                                                        <button className="btn btn-sm btn-warning" onClick={() => updateUser(service.id)}>Update</button>
                                                                        <button className="btn btn-sm btn-danger mx-1" onClick={(event) => deleteUser(event, service.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-primary btn-sm' to="/addServiceProvider">Add Service Provider</Link>
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

export default ServiceProviderList;