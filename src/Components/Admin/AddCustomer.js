import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AddCustomer = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            password: user.password,
        };
        axios.post(`api/addCustomer`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setUser({ ...user, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            }else{
                if(response.data.duplicateEmail){
                    swal("Warning", response.data.duplicateEmail, "error");
                }else{
                    swal("Success", response.data.success, "success");
                    history.push('/customerList');
                }
            }
        });
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>
               
                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                <h3 className='text-center text-uppercase fw-bold'>Add Customer</h3>
                    <form onSubmit={Submit}>

                        <input type="text" onChange={handelChange} placeholder='Name' name="name" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.name}</span>
                        <input type="email" onChange={handelChange} placeholder='Email' name="email" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.email}</span>
                        <input type="password" onChange={handelChange} placeholder='Password' name="password" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.password}</span>
                        <input type="text" onChange={handelChange} placeholder='Address' name="address" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.address}</span>
                        <input type="text" onChange={handelChange} placeholder='Phone' name="phone" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.phone}</span> <br />
                        <button type="submit" className='w-25 btn btn-sm btn-success mt-4' >Add</button>
                        <Link className='btn btn-sm btn-danger px-3 mx-5 mt-4' to="/customerList">Back </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;