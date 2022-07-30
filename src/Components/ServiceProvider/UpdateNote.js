import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getSingleNote/${id}`)
            .then(res => res.json())
            .then(data => setNote(data))
    }, [id]);
    const history = useHistory();
    const notes = ()=>{
        let serviceProviderId = localStorage.getItem('id');
        history.push(`/serviceProviderNotes/${serviceProviderId}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>
                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <form action="http://127.0.0.1:8000/api/updateNoteAPI" method='post'>
                        <h3 className='text-center text-uppercase fw-bold'>Update Order</h3>
                        <input className='my-2 w-100' hidden required type="text" defaultValue={note.id} name="id" />
                        <input className='my-2 w-100' hidden required type="text" defaultValue={note.serviceProviderId} name="serviceProviderId" />
                        <input className='my-2  w-100' required type="text" defaultValue={note.s_ProviderName} name="s_ProviderName" />
                        <input className='my-2  w-100' required type="text" defaultValue={note.productName} name="productName" />
                        <input className='my-2  w-100' required type="text" defaultValue={note.Address} name="Address" />
                        <input className='my-2  w-100' required type="text" defaultValue={note.note} name="note" />
                        <select name="status" className='my-2 w-100'>
                            <option defaultValue="">Status</option>
                            <option defaultValue="Delivered">Delivery Done</option>
                        </select>
                        <button className='my-2  w-25 btn btn-success btn-sm' type="submit"  >Update</button>
                        <button onClick={notes} className='btn btn-sm btn-danger px-3 mx-5'>Back </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateNote;