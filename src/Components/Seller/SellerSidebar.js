import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { faUserCircle, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const SellerSidebar = () => {
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
    const sellerProducts = ()=>{
        let sellerId = localStorage.getItem('id');
        history.push(`/sellerProducts/${sellerId}`);
    }
    const sellerOrders = ()=>{
        let sellerId = localStorage.getItem('id');
        history.push(`/sellerOrders/${sellerId}`);
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
                            <span>Seller
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
                    <Link to='/productList' style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>All Product</span>
                        </div>
                    </Link>
                </div>
                <div className="text-center">
                    <button onClick={sellerProducts} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>My Products</span>
                        </div>
                    </button>
                </div>


                <div className="text-center">
                    <button onClick={sellerOrders} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>My All Order</span>
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

export default SellerSidebar;