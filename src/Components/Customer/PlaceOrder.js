import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const PlaceOrder = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleProduct/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    console.log(product);

    const history = useHistory();
    const [user, setUser] = useState({
        customerName: '',
        Address: '',
        phone: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            productName: product.name,
            customerName: user.customerName,
            Address: user.Address,
            phone: user.phone,
            price: product.price,
            status: 'Pending',
            method: 'COA',
            sellerId: product.sellerId,
            productId: product.id,
            customerId: parseInt(localStorage.getItem("id")),
        };
        console.log(data);
        axios.post(`api/addOrder`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setUser({ ...user, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                swal("Success", response.data.success, "success");
                let ID = localStorage.getItem('id');
                history.push(`/customerOrders/${ID}`);
            }
        });
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>

                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <h3 className='text-center text-uppercase fw-bold'>Place Order</h3>
                    <form onSubmit={Submit}>

                        <input type="text" onChange={handelChange} placeholder='Your Name' name="customerName" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.userName}</span>
                        <input type="text" onChange={handelChange} placeholder='Your Address' name="Address" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.Address}</span>
                        <input type="text" onChange={handelChange} placeholder='Your Phone' name="phone" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{user.errors.phone}</span>

                        <select className='my-2 w-100'>
                            <option >Select Method</option>
                            <option>Cash On delivery</option>

                        </select>
                        <br />
                        <button type="submit" className=' btn btn-sm btn-success mt-4' >Place Order</button>
                        <Link className='btn btn-sm btn-danger px-3 mx-5 mt-4' to="/">Home </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;