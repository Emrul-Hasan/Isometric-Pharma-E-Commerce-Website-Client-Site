import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UpdateServiceProvider = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getServiceProvider/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    });
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
        <div>

            <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                <form action="http://127.0.0.1:8000/api/updateServiceProvider" method='post'>
                    <h3 className='text-center text-uppercase fw-bold'>Update Service Provider</h3>
                    <input className='my-2 w-100' hidden required type="text" defaultValue={user.id} name="id" />
                    <input className='my-2  w-100' required type="text" defaultValue={user.name} name="name" />
                    <input className='my-2  w-100' required type="text" defaultValue={user.address} name="address" />
                    <input className='my-2  w-100' required type="text" defaultValue={user.phone} name="phone" />
                    <select required name="status" className='my-2 w-100'>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                    </select>
                    <input className='my-2  w-100' required type="password" defaultValue={user.password} name="password" />
                    <button className='my-2  w-25 btn btn-success btn-sm' type="submit"  >Update</button>
                    <Link className='btn btn-sm btn-danger px-3 mx-5' to="/serviceProviderList">Back </Link>
                </form>

            </div>
        </div>
    </div>
    );
};

export default UpdateServiceProvider;