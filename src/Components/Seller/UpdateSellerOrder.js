import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateSellerOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleOrder/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [id]);

    const history = useHistory();
    const sellerOrders = ()=>{
        let sellerId = localStorage.getItem('id');
        history.push(`/sellerOrders/${sellerId}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>
                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <form action="http://127.0.0.1:8000/api/updateSellerOrderAPI" method='post'>
                        <h3 className='text-center text-uppercase fw-bold'>Update Order</h3>
                        <select required name="status" className='my-2 w-100'>
                            <option defaultValue="Accept" >Accept</option>
                            <option defaultValue="Pending">Pending</option>
                        </select>
                        <input className='my-2 w-100' hidden required type="text" defaultValue={order.id} name="id" />
                        <button className='my-2  w-25 btn btn-success btn-sm' type="submit">Update</button>
                        <button onClick={sellerOrders} className='btn btn-sm btn-danger px-3 mx-5'>Back </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateSellerOrder;