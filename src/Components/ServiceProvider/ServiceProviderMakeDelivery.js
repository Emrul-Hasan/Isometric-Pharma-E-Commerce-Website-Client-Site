import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const ServiceProviderMakeDelivery = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleOrderDetails/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [id]);
    console.log(order);

    const history = useHistory();
    const [delivery, setDelivery] = useState({
        name: '',
        comment: '',
        status: '',
        Address: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setDelivery({ ...delivery, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            Address: delivery.Address,
            customerName: order.customerName,
            customerId: order.customerId,
            productName: order.productName,
            productId: order.productId,
            s_ProviderName: delivery.name,
            serviceProviderId: localStorage.getItem('id'),
            comment: delivery.comment,
            status: delivery.status,
        };
        console.log(data);
        axios.post(`api/addToDelivery`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setDelivery({ ...delivery, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                swal("Success", response.data.success, "success");
                let serviceProviderId = localStorage.getItem('id');
                history.push(`/serviceProviderDeliveries/${serviceProviderId}`);
            }
        });
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh",background: "linear-gradient(45deg,#D0FFDC,#D0E1FF)"}}>
            <div>

                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <h3 className='text-center text-uppercase fw-bold'>Confirm Delivery</h3>
                    <form onSubmit={Submit}>

                        <input type="text" onChange={handelChange} placeholder='Your Name' name="name" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{delivery.errors.name}</span>
                        <input type="text" onChange={handelChange} placeholder='Delivery Address' name="Address" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{delivery.errors.Address}</span>
                        <input type="text" onChange={handelChange} placeholder='Your Comment' name="comment" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{delivery.errors.comment}</span>

                        <select  onChange={handelChange} name="status" className='my-2 w-100'>
                            <option defaultValue="delivered" >Delivery Status</option>
                            <option defaultValue="delivered">Delivery Done</option>
                        </select>
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{delivery.errors.status}</span>
                        <br />
                        <button type="submit" className=' btn btn-sm btn-success mt-4' >Delivery</button>
                        <Link className='btn btn-sm btn-danger px-3 mx-5 mt-4' to="/dashboard">Back </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderMakeDelivery;