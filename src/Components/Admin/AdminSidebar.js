import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faBars,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const AdminSidebar = () => {
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
    return (
        <div className="col-3" style={{ minHeight: "90vh", background: "linear-gradient(45deg,  #3D0000,#6c66a8)" }}>
            <div className="px-2 py-5">

                <div className="text-center">
                    <Link to="/dashboard" style={{ textAlign: "left" }} className="btn fw-bold btn-warning my-2 w-75">
                        <div className='d-flex'>
                            <span>                  
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faUserCircle} />
                            </span>
                            <span>Admin
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
                    <Link to="/sellerList" style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                            <FontAwesomeIcon icon="fa-solid fa-bars-filter" />
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Seller List</span>
                        </div>
                    </Link>
                </div>

                <div className="text-center">
                    <Link to="/orderList" style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                           
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Order List</span>
                        </div>
                    </Link>
                </div>

                <div className="text-center">
                    <Link to='/productList' style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Product List</span>
                        </div>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to="/customerList" style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Customer List</span>
                        </div>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to="/serviceProviderList" style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                        <div className='d-flex'>
                            <span>
                                <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                            </span>
                            <span>Service Provider List</span>
                        </div>
                    </Link>
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

export default AdminSidebar;