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

const CustomerList = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        axios.get("/api/customerList").then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                setCustomerList(response.data);
            }
        })
    }, []);
    const deleteUser = async (event, id) => {
        const response = await axios.delete(`/api/deleteCustomer/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    const history = useHistory();
    const updateUser = (id) => {
        const url = `/updateCustomer/${id}`;
        history.push(url);
    }
    const customerOrderList = (id) => {
        const url = `/customerOrderList/${id}`;
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
                            <div className="col-9">
                                <h3 className="mt-5 text-uppercase fw-bold">Customer List</h3>
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
                                                        customerList.map(customer =>
                                                            <tbody className="text-center">
                                                                <tr>
                                                                    <td>{customer.id}</td>
                                                                    <td>{customer.name}</td>
                                                                    <td>{customer.email}</td>
                                                                    <td>{customer.phone}</td>
                                                                    <td>{customer.address}</td>
                                                                    {
                                                                        customer.status === 'Pending' ?
                                                                            (
                                                                                <td style={{ color: "red" }} className="fw-bold">{customer.status}</td>
                                                                            ) :
                                                                            <td className="fw-bold">{customer.status}</td>
                                                                    }
                                                                    <td>
                                                                    <button className="btn btn-sm btn-primary mx-1" onClick={() => customerOrderList(customer.id)}>Orders</button>
                                                                        <button className="btn btn-sm btn-warning" onClick={() => updateUser(customer.id)}>Update</button>
                                                                        <button className="btn btn-sm btn-danger mx-1" onClick={(event) => deleteUser(event, customer.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-info btn-sm' to="/addCustomer">Add Customer</Link>
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

export default CustomerList;