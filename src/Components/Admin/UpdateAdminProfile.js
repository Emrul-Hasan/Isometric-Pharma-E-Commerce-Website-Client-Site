import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UpdateAdminProfile = () => {
    const [user, setUser] = useState({});
    const id = localStorage.getItem('id');
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/adminInfo/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id]);
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh",background: "linear-gradient(45deg,#F6EBEF,#370519)"}}>
            <div>
                <div style={{ width: "400px", background: "gray", padding: "30px", borderRadius: "10px" }}>
                    <form action="http://127.0.0.1:8000/api/updateAdminProfile" method='post'>
                        <h3 className='text-center text-uppercase fw-bold'>Update Profile</h3>
                        <input className='my-2 w-100' hidden required type="text" defaultValue={user.id} name="id" />
                        <input className='my-2  w-100' required type="text" defaultValue={user.name} name="name" />
                        <input className='my-2  w-100' required type="text" defaultValue={user.address} name="address" />
                        <input className='my-2  w-100' required type="text" defaultValue={user.phone} name="phone" />
                        <input className='my-2  w-100' required type="password" defaultValue={user.password} name="password" />
                        <button className='my-2  w-25 btn btn-success btn-sm' type="submit"  >Update</button>
                        <Link className='btn btn-sm btn-danger px-3 mx-5' to="/dashboard">Back </Link>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateAdminProfile;