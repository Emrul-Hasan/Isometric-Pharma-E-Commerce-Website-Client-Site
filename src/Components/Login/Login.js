import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import './Login.css';

const Login = () => {
    const history = useHistory();
    const [login, setLogin] = useState({
        email: '',
        password: '',
        role: '',
        errors: []
    });

    const handelChange = (event) => {
        event.persist();
        setLogin({ ...login, [event.target.name]: event.target.value });
    };

    const loginSubmit = (event) => {
        event.preventDefault();
        const data = {
            role: login.role,
            email: login.email,
            password: login.password
        };

        axios.post(`/api/login`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setLogin({ ...login, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                if (response.data.status === "notFound") {
                    swal("Warning", "User not Found!", "error");

                } else {
                    if (response.data.status === "success") {
                        localStorage.setItem('token', response.data.token,);
                        localStorage.setItem('role', response.data.role);
                        localStorage.setItem('id', response.data.id);  
                        localStorage.setItem('email', response.data.email);
                        localStorage.setItem('name', response.data.name);  
                        localStorage.setItem('phone', response.data.phone);  
                        swal("Success", "Login Successful!", "success");
                        history.push("/dashboard");

                    } else {
                        swal("Warning", response.data.pending_error, "error");
                    }
                }
            }
        })

    }

    return (
        <body>
            <div className="backgroundArea">

            </div>
            <div className="contentArea">
                <div className="main">
                    <div className="login-area">
                        <div className="row">
                            <div className="col-6 login-banner">
                                <div className="img-area">
                                    <img src="../../images/login/login-banner.jpg" alt="img" />
                                </div>
                            </div>
                            <div className="col-6 login-content">
                                <div>


                                    <div className="d-flex justify-content-center">
                                        <img src="images/login/login.png" alt="img" />
                                        <h3 className="ml-3 mb-5" style={{ color: "white" }}>LOGIN</h3>
                                    </div>
                                    <form onSubmit={loginSubmit} >
                                        <div className="mb-3">
                                            <img className="mr-2 " src="images/login/user.png" alt="" />

                                            <select onChange={handelChange} name="role" style={{ padding: "3px 65px 3px 15px" }}>
                                                <option value="">Login as</option>
                                                <option value="admin" >Admin</option>
                                                <option value="customer" >Customer</option>
                                                <option value="seller">Seller</option>
                                                <option value="service" >Service Provider</option>
                                            </select> <br />
                                            <span style={{
                                                color: "red", fontSize: "12px", fontWeight: "bold"
                                            }}>{login.errors.role}</span>

                                        </div>
                                        <div className="mb-3">
                                            <img className="mr-2" src="images/login/email.png" alt="" />
                                            <input type="email" name="email" onChange={handelChange} value={login.email} placeholder="Your Email" />
                                            <br />
                                            <span style={{
                                                color: "red", fontSize: "12px", fontWeight: "bold"
                                            }}>{login.errors.email}</span>
                                        </div>

                                        <div className="mb-3">
                                            <img className="mr-2" src="images/login/password.png" alt="" />
                                            <input type="password" name="password" onChange={handelChange} value={login.password} placeholder="Your Password" /> <br />
                                            <span style={{
                                                color: "red", fontSize: "12px", fontWeight: "bold"
                                            }}>{login.errors.password}</span>
                                        </div>

                                        <div className="mb-3 d-flex justify-content-end">
                                            <button type="submit" className="login-button font-weight-bold">Login</button>
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
                                    <div className="mb-3 d-flex justify-content-end">
                                        <div>
                                            <div style={{ color: "red", fontWeight: "bold" }}>
                                                <span>Are you new user?</span> <br />
                                            </div>
                                            <div className="ml-auto">
                                                <div>
                                                    <Link className="font-weight-bold underline reg-link" to="/registration">create an account</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Login;



