import React from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import CustomerDashboard from '../Customer/CustomerDashboard';
import Error from '../Error/Error';
import SellerDashboard from '../Seller/SellerDashboard';
import ServiceDashboard from '../ServiceProvider/ServiceDashboard';

const Dashboard = () => {
    let Dashboard = '';
    if (localStorage.getItem('role') === 'admin') {
        Dashboard = (
            <AdminDashboard></AdminDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'customer') {
        Dashboard = (
            <CustomerDashboard></CustomerDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'seller') {
        Dashboard = (
            <SellerDashboard></SellerDashboard>
        )
    }
    else if (localStorage.getItem('role') === 'service') {
        Dashboard = (
            <ServiceDashboard></ServiceDashboard>
        )
    }else{
        Dashboard = (
            <Error></Error>
        )
    }
    return (
        <div>
            {Dashboard}
        </div>
    );
};

export default Dashboard;