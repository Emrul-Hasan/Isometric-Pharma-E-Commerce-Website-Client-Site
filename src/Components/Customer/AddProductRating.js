import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const AddProductRating = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleOrder/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [id]);
    console.log(order);

    const history = useHistory();
    const [productReview, setProductReview] = useState({
        rating: '',
        review: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setProductReview({ ...productReview, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            productId: order.productId,
            productName: order.productName,
            rating: productReview.rating,
            review: productReview.review,
            customerId:parseInt(localStorage.getItem("id")),
            customerName: localStorage.getItem("name")
        };
        console.log(data);
        axios.post(`api/addProductRating`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setProductReview({ ...productReview, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                swal("Success", response.data.success, "success");
                let ID = localStorage.getItem('id');
                history.push(`/customerProductReviews/${ID}`);
            }
        });
       
    }
    const back = ()=>{
        let ID = localStorage.getItem('id');
        history.push(`/customerProductReviews/${ID}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
        <div>

            <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                <h3 className='text-center text-uppercase fw-bold'>Product Review</h3>
                <form onSubmit={Submit}>

                    <input type="text" onChange={handelChange} placeholder='Review' name="review" className='w-100 my-2' />
                    <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{productReview.errors.review}</span>
                
                    <select onChange={handelChange} name="rating" className='my-2 w-100'>
                        <option defaultValue="0">Rating</option>
                        <option defaultValue="1">1</option>
                        <option  defaultValue="2">2</option>
                        <option  defaultValue="3">3</option>
                        <option  defaultValue="4">4</option>
                        <option  defaultValue="5">5</option>
                    </select>
                    <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{productReview.errors.rating}</span>
                    <br />
                    <button type="submit" className=' btn btn-sm btn-success mt-4' >Submit</button>
                    <button onClick={back} className='btn btn-sm btn-danger px-3 mx-5 mt-4' >Back </button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default AddProductRating;