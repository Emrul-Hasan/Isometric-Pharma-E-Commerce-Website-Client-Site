import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const AddServiceRating = () => {
    const { id } = useParams();
    const [delivery, setDelivery] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleDelivery/${id}`)
            .then(res => res.json())
            .then(data => setDelivery(data))
    }, [id]);
    console.log(delivery);

    const history = useHistory();
    const [serviceReview, setServiceReview] = useState({
        rating: '',
        review: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setServiceReview({ ...serviceReview, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            serviceProviderId: delivery.serviceProviderId,
            s_ProviderName: delivery.s_ProviderName,
            rating: serviceReview.rating,
            review: serviceReview.review,
            customerId:parseInt(localStorage.getItem("id")),
            customerName: localStorage.getItem("name")
        };
        console.log(data);
        axios.post(`api/addServiceRating`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setServiceReview({ ...serviceReview, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                swal("Success", response.data.success, "success");
                let ID = localStorage.getItem('id');
                history.push(`/customerServiceReviews/${ID}`);
            }
        });
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
        <div>

            <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                <h3 className='text-center text-uppercase fw-bold'>Place Order</h3>
                <form onSubmit={Submit}>

                    <input type="text" onChange={handelChange} placeholder='Review' name="review" className='w-100 my-2' />
                    <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{serviceReview.errors.review}</span>
                
                    <select onChange={handelChange} name="rating" className='my-2 w-100'>
                        <option defaultValue="0">Rating</option>
                        <option defaultValue="1">1</option>
                        <option  defaultValue="2">2</option>
                        <option  defaultValue="3">3</option>
                        <option  defaultValue="4">4</option>
                        <option  defaultValue="5">5</option>
                    </select>
                    <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{serviceReview.errors.rating}</span>
                    <br />
                    <button type="submit" className=' btn btn-sm btn-success mt-4' >Submit</button>
                    <Link className='btn btn-sm btn-danger px-3 mx-5 mt-4' to="/dashboard">Home </Link>
                </form>
            </div>
        </div>
    </div>
    );
};

export default AddServiceRating;