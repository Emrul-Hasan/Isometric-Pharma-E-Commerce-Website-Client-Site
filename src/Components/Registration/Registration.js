import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Registration.css';
import swal from 'sweetalert';
import axios from 'axios';

const Registration = () => {
    const history = useHistory();
    const [registration, setRegistration] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: '',
        errors: []
    });
    const handelChange = (event) => {
        event.persist();
        setRegistration({ ...registration, [event.target.name]: event.target.value });
    };

    const RegistrationSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: registration.name,
            email: registration.email,
            address: registration.address,
            phone: registration.phone,
            password: registration.password,
            confirmPassword: registration.confirmPassword,
            role: registration.role,
        };
        axios.post(`/api/registration`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setRegistration({ ...registration, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            }else{
                if(response.data.duplicateEmail){
                    swal("Warning", response.data.duplicateEmail, "error");
                }else{
                    swal("Success", response.data.success, "success");
                    history.push('/login');
                }
            }

        });
    }
    return (
        <div>
            <body>
                <div className="backgroundArea1">

                </div>
                <div className="contentArea">
                    <div className="main">
                        <div className="registration-area">
                            <div className="row">
                                <div className="col-6 registration-content">
                                    <div className="ml-4">
                                        <div className="d-flex justify-content-center">
                                            <img src="images/login/login.png" alt="img" />
                                            <h3 className="ml-3 mb-5" style={{ color: "white" }}>REGISTRATION</h3>
                                        </div>

                                        <form onSubmit={RegistrationSubmit}>
                                            <div className="row ">
                                                <div className="col-6">

                                                    {/* name */}
                                                    <div className=" mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/name.png" alt="" />
                                                            <input value={registration.name} onChange={handelChange} type="text" name="name" placeholder="Your Name" />
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.name}</span>
                                                    </div>

                                                    {/* Address */}
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/address.png" alt="" />
                                                            <input value={registration.address} onChange={handelChange} type="text" name="address"
                                                                placeholder="Your Address" />
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.address}</span>
                                                    </div>

                                                    {/* password */}
                                                    <div className=" mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/password.png" alt="" />
                                                            <input value={registration.password} onChange={handelChange} type="password" name="password" placeholder="Your Password" />
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.password}</span>
                                                    </div>

                                                    {/* user role */}
                                                    <div className=" mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/user.png" alt="" />
                                                            <div>
                                                                <select onChange={handelChange} name="role">
                                                                    <option value="">Register As</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="customer">Customer</option>
                                                                    <option value="seller">Seller</option>
                                                                    <option value="service">Service Provider</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.role}</span>
                                                    </div>

                                                    {/* status */}
                                                    <input type="text" hidden name="status"
                                                        placeholder="" />
                                                </div>
                                                <div className="col-6">

                                                    {/* Email */}
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/email.png" alt="" />
                                                            <input value={registration.email} onChange={handelChange} type="text" name="email"
                                                                placeholder="Your Email" />
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.email}</span>
                                                    </div>

                                                    {/* Herbals */}
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/phone.png" alt="" />
                                                            <input value={registration.phone} onChange={handelChange} type="text" name="phone"
                                                                placeholder="Your Phone" />
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.phone}</span>
                                                    </div>

                                                    {/* Confirm password */}
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img className="mr-2" src="images/registration/confirm.png" alt="" />
                                                            <input value={registration.confirmPassword} onChange={handelChange} type="password" name="confirmPassword"
                                                                placeholder="Confirm Password" />
                                                        </div>
                                                        <span style={{
                                                            color: "red", fontSize: "12px", fontWeight: "bold"
                                                        }}>{registration.errors.confirmPassword}</span>
                                                    </div>


                                                    <div className="mb-4 d-flex justify-content-end">
                                                        <button type="submit" className="registration-button font-weight-bold">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>




                                        <div className="h5 d-flex justify-content-center align-items-center" style={{ color: "black" }}>
                                            <div className="header-dash"
                                                style={{ height: "2px", width: "50%", background: "gray", borderRadius: "10px" }}></div>
                                            <div className="">
                                                <span className="mx-2">or</span>
                                            </div>
                                            <div className="header-dash"
                                                style={{ height: "2px", width: "50%", background: "gray", borderRadius: "10px" }}></div>
                                        </div>

                                        <div className="mb-4 d-flex justify-content-end">
                                            <div>
                                                <div style={{ color: "white", fontWeight: "bold" }} className="mr-3">
                                                    <span>Have an account?</span>
                                                </div>
                                                <div className="mr-auto">
                                                    <div>
                                                        <Link className="font-weight-bold underline login-link" to="/login">Please login here</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="registration-banner">
                                        <div className="img-area">
                                            <img src="images/registration/registration-banner5.jpg" alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
};

export default Registration;