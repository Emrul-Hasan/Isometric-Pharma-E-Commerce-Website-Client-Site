import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const MakeNote = () => {
    const history = useHistory();
    const [note, setNotes] = useState({
        s_ProviderName: '',
        productName: '',
        Address: '',
        status: '',
        note: '',
        serviceProviderId: '',
        errors: []
    })
    const handelChange = (event) => {
        event.persist();
        setNotes({ ...note, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            s_ProviderName: note.s_ProviderName,
            productName: note.productName,
            Address: note.Address,
            status: note.status,
            note: note.note,
            serviceProviderId: localStorage.getItem('id'),
        };
        axios.post(`api/addNote`, data).then(response => {
            console.log(response.data);
            if (response.data.validation_errors) {
                setNotes({ ...note, errors: response.data.validation_errors });
                swal("Warning", "Validation Error!", "error");
            } else {
                swal("Success", response.data.success, "success");
                let serviceProviderId = localStorage.getItem('id');
                history.push(`/serviceProviderNotes/${serviceProviderId}`);
            }
        });
    }
    const notes = () => {
        let serviceProviderId = localStorage.getItem('id');
        history.push(`/serviceProviderNotes/${serviceProviderId}`);
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>

                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <h3 className='text-center text-uppercase fw-bold'>Make A Note</h3>
                    <form onSubmit={Submit}>

                        <input type="text" onChange={handelChange} placeholder='Your Name' name="s_ProviderName" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{note.errors.s_ProviderName}</span>
                        <input type="text" onChange={handelChange} placeholder='Product Name' name="productName" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{note.errors.productName}</span>
                        <input type="text" onChange={handelChange} placeholder='Delivery Address' name="Address" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{note.errors.Address}</span>
                        <input type="text" onChange={handelChange} placeholder='Your Note' name="note" className='w-100 my-2' />
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{note.errors.note}</span>
                        <select onChange={handelChange} name="status" className='my-2 w-100'>
                            <option defaultValue="">Status</option>
                            <option defaultValue="Delivered">Delivery Done</option>
                        </select>
                        <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>{note.errors.status}</span>
                       <br />
                        <button type="submit" className='w-25 btn btn-sm btn-success mt-4' >Add</button>
                        <button className='btn btn-sm btn-danger px-3 mx-5 mt-4' onClick={notes}>Back </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeNote;