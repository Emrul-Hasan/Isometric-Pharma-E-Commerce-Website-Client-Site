import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const CustomerSidebar = () => {
    const history = useHistory();
    const logout = (event) => {
        event.preventDefault();
        const data = {
            token: localStorage.getItem('token')
        };
        axios.post('/api/logout', data)
            .then(response => {
                if (response.data.status === 'success') {
                    localStorage.removeItem('token', response.data.token);
                    localStorage.removeItem('role', response.data.role);
                    localStorage.removeItem('id', response.data.id);
                    localStorage.removeItem('name', response.data.name);
                    localStorage.removeItem('email', response.data.email);
                    localStorage.removeItem('phone', response.data.phone);
                    swal("Success", response.data.message, "success");
                    history.push('/');
                } else {
                    swal("Warning", "Something wrong", "error");
                }
            })
    }
    const customerOrders = ()=>{
        let ID = localStorage.getItem('id');
        history.push(`/customerOrders/${ID}`);
    }
    const customerProductReview = ()=>{
        let ID = localStorage.getItem('id');
        history.push(`/customerProductReviews/${ID}`);
    }
    
    const customerServiceReview = ()=>{
        let ID = localStorage.getItem('id');
        history.push(`/customerServiceReviews/${ID}`);
    }
    const customerDeliveries = ()=>{
        let ID = localStorage.getItem('id');
        history.push(`/customerProductDeliveries/${ID}`);
    }
    return (
        <div className="col-3" style={{ minHeight: "95vh", background: "#160040" }}>
            <div className="px-2 py-5">

                <div className="text-center">
                    <Link to="/dashboard" style={{ textAlign: "left" }} className="btn fw-bold btn-warning my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faUserCircle} />
                            </span>
                            <span>Customer
                                <span className='mx-1'>
                                    {
                                        localStorage.getItem('name')
                                    }
                                </span>
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to="/dashboard" style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>My Profile</span>
                        </div>
                    </Link>
                </div>

               
                <div className="text-center">
                    <Link to='/products' style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>All Product</span>
                        </div>
                    </Link>
                </div>
                <div className="text-center">
                    <button onClick={customerOrders} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>My Order</span>
                        </div>
                    </button>
                </div>
                <div className="text-center">
                    <button onClick={customerDeliveries} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Deliveries</span>
                        </div>
                    </button>
                </div>
                <div className="text-center">
                    <button onClick={customerProductReview} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Product Review List</span>
                        </div>
                    </button>
                </div>

                <div className="text-center">
                    <button onClick={customerServiceReview} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Service Review List</span>
                        </div>
                    </button>
                </div>

                

                <div className="text-center">
                    <span onClick={logout} style={{ textAlign: "left" }} className="font-weight-bold btn btn-danger my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faSignOutAlt} />
                            </span>
                            <span>Logout</span>
                        </div>
                    </span>
                </div>
            </div>

        </div>
    );
};

export default CustomerSidebar;