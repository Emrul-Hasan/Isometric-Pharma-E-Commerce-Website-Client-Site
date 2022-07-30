import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateDelivery = () => {
    const { id } = useParams();
    const [delivery, setDelivery] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleDelivery/${id}`)
            .then(res => res.json())
            .then(data => setDelivery(data))
    }, [id]);
    const history = useHistory();
    const back = ()=>{
        let serviceProviderId = localStorage.getItem('id');
        history.push(`/serviceProviderDeliveries/${serviceProviderId}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>
                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <form action="http://127.0.0.1:8000/api/updateDeliveryAPI" method='post'>
                        <h3 className='text-center text-uppercase fw-bold'>Update Delivery</h3>
                        <input className='my-2 w-100' hidden required type="text" defaultValue={delivery.id} name="id" />
                        <input className='my-2  w-100' required type="text" defaultValue={delivery.s_ProviderName} name="s_ProviderName" />
                        <input className='my-2  w-100' required type="text" defaultValue={delivery.Address} name="Address" />
                        <input className='my-2  w-100' required type="text" defaultValue={delivery.comment} name="comment" />
                        <select name="status" className='my-2 w-100'>
                            <option defaultValue="delivered" >Delivery Status</option>
                            <option defaultValue="delivered">Delivery Done</option>
                        </select>
                        <button className='my-2  w-25 btn btn-success btn-sm' type="submit"  >Update</button>
                        <button className='btn btn-sm btn-danger px-3 mx-5' onClick={back}>Back </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateDelivery;