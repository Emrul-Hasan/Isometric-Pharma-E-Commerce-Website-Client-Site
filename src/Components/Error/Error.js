import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <div>
                <h3 className='text-danger font-weight-bold'>Unauthorized access!</h3>
                <div className='text-center mt-3'>
                <Link className='btn btn-sm btn-primary ' to='/'>Home</Link>
                </div>
            </div>

        </div>
    );
};

export default Error;