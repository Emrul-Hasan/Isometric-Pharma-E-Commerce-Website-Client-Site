import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import swal from 'sweetalert';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ServiceProviderSidebar from './ServiceProviderSidebar';

const ServiceProviderNotes = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [note, setNote] = useState([]);

    useEffect(() => {
        const serviceId = localStorage.getItem('id');
        axios.get(`/api/getServiceNotes/${serviceId}`).then(response => {
            if (response.data.error) {
                swal("Warning", "Invalid Token!", "error");
            } else {
                setNote(response.data);
            }
        })
    }, []);
    const deleteNote = async (event, id) => {
        const response = await axios.delete(`/api/deleteNote/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    const history = useHistory();
    const updateNote = (id) => {
        const url = `/updateNote/${id}`;
        history.push(url);
    }
    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'service' ?
                    <div>
                        <div className="row">
                            <ServiceProviderSidebar></ServiceProviderSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,#D0FFDC,#D0E1FF)"}}>
                                <h3 className="mt-5 text-uppercase fw-bold">My Notes</h3>
                                {
                                    loading ?
                                        (
                                            <div className="loading-bg">
                                                <div className="d-flex justify-content-center align-items-center text-center" >
                                                    <div className="">
                                                        <div className="">
                                                            <h5 className="fw-bold text-uppercase" style={{ color: "red" }}>
                                                                <span><span className="mx-2">Loading</span>
                                                                    <PulseLoader className="App" size={10} color={"red"} loading={loading} />
                                                                    <PulseLoader className="App" size={10} color={"red"} loading={loading} />
                                                                </span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) :

                                        (
                                            <div>
                                                <table className="table table-striped table-hover">
                                                    <thead className="bg-dark text-white text-center">
                                                        <tr >
                                                            <th>Note Id</th>
                                                            <th>Your Name</th>
                                                            <th>Delivery Product</th>
                                                            <th>Delivery Address</th>
                                                            <th>Delivery Status</th>
                                                            <th>Short Note</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        note.map(note =>

                                                            <tbody className="text-center">

                                                                <tr>
                                                                    <td>{note.id}</td>
                                                                    <td>{note.s_ProviderName}</td>
                                                                    <td>{note.productName}</td>
                                                                    <td>{note.Address}</td>
                                                                    <td>{note.status}</td>
                                                                    <td>{note.note}</td>
                                                                    <td>

                                                                        <button className="btn btn-sm btn-warning" onClick={() => updateNote(note.id)}>Update</button>
                                                                        <button className="btn btn-sm btn-danger mx-1" onClick={(event) => deleteNote(event, note.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-primary btn-sm' to="/makeNote">Make A Note</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <Error></Error>
            }
            <Footer></Footer>
        </section>
    );
};

export default ServiceProviderNotes;