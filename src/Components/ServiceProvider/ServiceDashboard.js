import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ServiceProviderSidebar from './ServiceProviderSidebar';

const ServiceDashboard = () => {
    // set image to imgbb.com
    const [imageURL, setImageURL] = useState(null);
    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', '0bdc42b3cf235e6981d19573c2c5875f');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setImageURL(response.data.data.display_url);
                swal("Success", "Image uploaded successfully!", "success");
            })
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            id: localStorage.getItem('id'),
            image: imageURL
        };
        axios.post(`/api/serviceProviderPhoto`, data).then(response => {
            if (response.data.message) {
                window.location.reload(false);
                swal("Success", "Image save Successfully!", "success");
            }
        })
    };
    // // Get info
    const [user, setUser] = useState([]);
    const id = parseInt(localStorage.getItem('id'));

    useEffect(() => {
        axios.get(`api/serviceProviderInfo/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);
    return (           
        <div>
            <Header />
            <div className="row">
                <ServiceProviderSidebar></ServiceProviderSidebar>
                <div className="col-9">
                    <div className="row" style={{ height: "90vh",background: "linear-gradient(45deg,#D0FFDC,#D0E1FF)" }}>
                        <div className="col-md-6">
                            <div className="d-flex align-items-center justify-content-center" style={{ height: "90vh" }}>
                                <div className="p-5"
                                    style={{ borderRadius: "10px", background: "#EFE3D0", height: "400px", width: "430px", boxShadow: "3px 3px 10px gray" }}>
                                    <h4 className="mb-5 fw-bold text-danger text-uppercase">Profile Picture</h4>
                                    <img src={user.image} alt=''
                                        width="130px" height="160px" />

                                    <form onSubmit={onSubmit} encType='multiple/form-data'>
                                        <input type="file" required onChange={handleImageUpload} className="w-100" />
                                        <button type="submit" className="btn btn-primary btn-sm mt-3">Set Photo</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center justify-content-center" style={{ height: "90vh" }}>
                                <div className="p-5"
                                    style={{ borderRadius: "10px", background: "#EFE3D0", height: "400px", width: "430px", boxShadow: "3px 3px 10px gray" }}>
                                    <h5 className="mb-5 fw-bold text-danger text-uppercase">Service Provider Information</h5>
                                    <div className="h5 fw-bold my-3 form-control">
                                        Name : {user.name}
                                    </div>
                                    <div className="h5 fw-bold  my-3 form-control">
                                        Email : {user.email}
                                    </div>
                                    <div className="h5 fw-bold  my-3 form-control">
                                        Phone : {user.phone}
                                    </div>
                                    <div className="h5 fw-bold  my-3 form-control">
                                        Address : {user.address}
                                    </div>
                                    <div>
                                        <Link to="/updateServiceProviderProfile" className="btn btn-danger btn-sm">Edit
                                            Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ServiceDashboard;