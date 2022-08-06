import { faBars, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const ServiceProviderSidebar = () => {
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
    const notes = ()=>{
        let serviceProviderId = localStorage.getItem('id');
        history.push(`/serviceProviderNotes/${serviceProviderId}`);
    }
    const reviews = ()=>{
        let serviceProviderId = localStorage.getItem('id');
        history.push(`/serviceProviderReviews/${serviceProviderId}`);
    }
    const deliveries = ()=>{
        let serviceProviderId = localStorage.getItem('id');
        history.push(`/serviceProviderDeliveries/${serviceProviderId}`);
    }
    const serviceProviderOrders = ()=>{
        history.push(`/serviceProviderOrders`);
    }
    

    return (
        <div className="col-3" style={{ minHeight: "95vh", background: "#433744" }}>
        <div className="px-2 py-5">

            <div className="text-center">
                <Link to="/dashboard" style={{ textAlign: "left" }} className="btn fw-bold btn-warning my-2 w-75">
                    <div className='d-flex'>
                        <span>
                            <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faUserCircle} />
                        </span>
                        <span>
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
                <button onClick={notes} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                    <div className='d-flex'>
                        <span>
                            <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                        </span>
                        <span>My Notes</span>
                    </div>
                </button>
            </div>

            

            <div className="text-center">
                <button onClick={serviceProviderOrders} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                    <div className='d-flex'>
                        <span>
                            <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                        </span>
                        <span>All Orders</span>
                    </div>
                </button>
            </div>

            <div className="text-center">
                <button onClick={reviews} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                    <div className='d-flex'>
                        <span>
                            <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                        </span>
                        <span>My Reviews</span>
                    </div>
                </button>
            </div>
            <div className="text-center">
                <button onClick={deliveries} style={{ textAlign: "left" }} className="btn btn-primary my-2 w-75">
                    <div className='d-flex'>
                        <span>
                            <FontAwesomeIcon style={{ height: "15px" }} className='px-2  w-100' icon={faBars} />
                        </span>
                        <span>My Deliveries</span>
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

export default ServiceProviderSidebar;