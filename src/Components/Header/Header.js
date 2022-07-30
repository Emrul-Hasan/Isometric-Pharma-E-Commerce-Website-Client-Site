/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserShield } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Header = () => {
    const history = useHistory();
    const logout = (event) => {
        event.preventDefault();
        const data = {
            token: localStorage.getItem('token')
        };
        axios.post('/api/logout', data)
            .then(response => {
                if (response.data.status === 'success') {
                    localStorage.removeItem('token', response.data.token);
                    localStorage.removeItem('role', response.data.role);
                    localStorage.removeItem('id', response.data.id);
                    localStorage.removeItem('name', response.data.name);
                    localStorage.removeItem('email', response.data.email);
                    localStorage.removeItem('phone', response.data.phone);
                    swal("Success", response.data.message, "success");
                    history.push('/');
                } else {
                    swal("Warning", "Something wrong", "error");
                }
            })
    }
    let isLoggedIn = '';
    localStorage.getItem('token') ?
        <div>
            {
                isLoggedIn = (
                    <div className='d-flex'>
                        <Link className="nav-link hover mx-2 text-white fw-bold" to="/dashboard">Dashboard</Link>
                        <span style={{ cursor: "pointer", color: "red", marginTop: "8px" }} onClick={logout} className='hover fw-bold mx-2'>Logout <FontAwesomeIcon icon={faSignOutAlt} /></span>
                        <span style={{ color: "yellow", marginTop: "8px" }} className='mx-2 hover fw-bold'>{localStorage.getItem('name')}<FontAwesomeIcon className='mx-1' icon={faUserShield} /></span>
                    </div>
                )
            }
        </div> :
        <div>
            {
                isLoggedIn = (
                    <Link className="nav-link mx-2 hover text-white fw-bold" to="/login"><span className='fw-bold'>Login</span> </Link>
                )
            }
        </div>
    return (
        <div style={{ marginBottom: "57px" }}>
            <nav className="navbar navbar-expand-lg  navbar-light fixed-top" style={{ background: "darkblue" }}>
                <div className="container-fluid container">
                    <img height={"20px"} src="../../images/store.png" alt="" />
                    <h3 className="text-white px-2">Isometric Shop</h3>
                    <div className="navbar-nav font-weight-bold ms-auto">
                        <Link className="nav-link mx-2 hover text-white fw-bold" to="/">Home</Link>
                        <Link className="nav-link mx-2 hover text-white fw-bold" to="/products">Products</Link>
                        <Dropdown >
                            <Dropdown.Toggle className='text-uppercase fw-bold' id="dropdown-basic" >
                                Category
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/medicine"><span className='fw-bold text-uppercase text-danger'>Medicine</span></Dropdown.Item>
                                <Dropdown.Item href="/personal"><span className='fw-bold text-uppercase text-danger'>Personal</span></Dropdown.Item>
                                <Dropdown.Item href="/supplement"><span className='fw-bold text-uppercase text-danger'>Supplement</span></Dropdown.Item>
                                <Dropdown.Item href="/herbals"><span className='fw-bold text-uppercase text-danger'>Herbal& homeopathic</span></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link className="nav-link mx-2 hover text-white fw-bold" to="/about">About</Link>
                        <Link className="nav-link mx-2 hover text-white fw-bold" to="/contact">Contact</Link>
                        {isLoggedIn}
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default Header;