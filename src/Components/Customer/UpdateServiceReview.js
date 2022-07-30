import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateServiceReview = () => {
    const { id } = useParams();
    const [review, setReview] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleServiceReview/${id}`)
            .then(res => res.json())
            .then(data => setReview(data))
    }, [id]);
    const history = useHistory();
    const back = ()=>{
        let ID = localStorage.getItem('id');
        history.push(`/customerServiceReviews/${ID}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>
                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <form action="http://127.0.0.1:8000/api/updateServiceReviewAPI" method='post'>
                        <h3 className='text-center text-uppercase fw-bold'>Update Service Review</h3>
                        <input className='my-2 w-100' hidden required type="text" defaultValue={review.id} name="id" />

                        <input className='my-2  w-100' required type="text" defaultValue={review.review} name="review" />
                        <select name="rating" className='my-2 w-100'>
                            <option defaultValue="0">Rating</option>
                            <option defaultValue="1">1</option>
                            <option defaultValue="2">2</option>
                            <option defaultValue="3">3</option>
                            <option defaultValue="4">4</option>
                            <option defaultValue="5">5</option>
                        </select>

                        <button className='my-2  w-25 btn btn-success btn-sm' type="submit"  >Update</button>
                        <button className='btn btn-sm btn-danger px-3 mx-5' onClick={back}>Back</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateServiceReview;