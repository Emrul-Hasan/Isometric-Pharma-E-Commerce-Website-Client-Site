import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CustomerSidebar from './CustomerSidebar'

const CustomerOrders = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [orderList, setOrderList] = useState([]);
    const customerId = localStorage.getItem('id');
    useEffect(() => {
        axios.get(`/api/customerOrders/${customerId}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                console.log(response.data);
                setOrderList(response.data);
            }
        })
    }, [customerId]);

    const history = useHistory();
    const update = (id) => {
        const url = `/updateCustomerOrder/${id}`;
        history.push(url);
    }
    //delete
    const deleteOrder = async (event, id) => {
        const response = await axios.delete(`/api/deleteOrder/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    // review
    const review = (id) => {
        const url = `/addProductRating/${id}`;
        history.push(url);
    }
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'customer' ?
                    <div>
                        <div className="row">
                            <CustomerSidebar></CustomerSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,  #F5AAAA,#A5F6CE)"}}>
                                <h3 className="mt-5 text-uppercase fw-bold">My Orders</h3>
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
                                                                <tr>
                                                                <td>{order.id}</td>
                                                                    <td>{order.productName}</td>
                                                                    <td>{order.Address}</td>
                                                                    <td>{order.phone}</td>
                                                                    <td>{order.status}</td>
                                                                    <td>{order.price}</td>
                                                                    <td>{order.method}</td>
                                                                    <td >
                                                                    <button className="mx-1 btn btn-sm btn-primary" onClick={() => review(order.id)}>Review</button>
                                                                        <button className=" btn btn-sm btn-warning" onClick={() => update(order.id)}>Update</button>
                                                                        <button className=" btn btn-sm btn-danger mx-1" onClick={(event) => deleteOrder(event, order.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-info btn-sm' to="/products">Buy Products</Link>
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

export default CustomerOrders;