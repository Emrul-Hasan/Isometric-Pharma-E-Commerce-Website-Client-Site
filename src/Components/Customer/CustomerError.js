import React from 'react';
import { Link } from 'react-router-dom';

const CustomerError = () => {
    return (
        <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center'>
        <div>
            <h3 className='text-danger font-weight-bold'>You have to login first!</h3>
            <div className='text-center mt-3'>
            <Link className='btn btn-sm btn-primary px-3' to='/products'>Back</Link>
            </div>
        </div>

    </div>
    );
};

export default CustomerError;