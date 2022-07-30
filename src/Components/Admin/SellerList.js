import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AdminSidebar from './AdminSidebar';
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SellerList = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const [sellerList, setSellerList] = useState([]);

    useEffect(() => {
        axios.get("/api/sellerList").then(response => {    
            if(response.data.error){
                swal("Warning", "Invalid Token!", "error");
            }else{
                setSellerList(response.data);
            }
        })
    },[]);
    const deleteUser = async (event, id) => {
        const response = await axios.delete(`/api/deleteSeller/${id}`);
        if (response.data.status === 'success') {
            window.location.reload(false);
            swal("Success", response.data.message, "success");
        }
    };
    const history = useHistory();
    const updateUser = (id) => {
        const url = `/updateSeller/${id}`;
        history.push(url);
    }
    const sellerProductList = (id) =>{
        const url = `/sellerProductList/${id}`;
        history.push(url);
    }

    return (
        <section>
            <Header></Header>
            {
                localStorage.getItem('role') === 'admin' ?
                    <div>
                        <div className="row">
                            <AdminSidebar></AdminSidebar>
                            <div className="col-9" style={{background: "linear-gradient(45deg,#F5AAAA,#6EDBFC)" }}>
                                <h3 className="mt-5 text-uppercase fw-bold">Seller List</h3>
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
                                                            <th >Id</th>
                                                            <th >Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Address</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        sellerList.map(seller =>

                                                            <tbody className="text-center">

                                                                <tr>
                                                                    <td>{seller.id}</td>
                                                                    <td>{seller.name}</td>
                                                                    <td>{seller.email}</td>
                                                                    <td>{seller.phone}</td>
                                                                    <td>{seller.address}</td>
                                                                   {
                                                                       seller.status === 'Pending' ? 
                                                                       (
                                                                        <td style={{ color:"red" }} className="fw-bold">{seller.status}</td>
                                                                       ) :
                                                                       <td className="fw-bold">{seller.status}</td>
                                                                   }
                                                                    <td>
                                                                        <button onClick={() => sellerProductList(seller.id)} className="btn btn-sm btn-primary mx-1">Products</button>
                                                                        <button className="btn btn-sm btn-warning" onClick={() => updateUser(seller.id)}>Update</button>
                                                                       
                                                                        <button className="btn btn-sm btn-danger mx-1" onClick={(event) => deleteUser(event, seller.id)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ) 
                                                    }
                                                </table>
                                            </div>
                                        )
                                }
                                <Link className='btn btn-success btn-sm' to="/addSeller">Add Seller</Link>
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

export default SellerList;