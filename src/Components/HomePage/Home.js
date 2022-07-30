import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Banner from './Banner';
import HomePageProduct from './HomePageProduct';

const Home = () => {
    return (
        <div>
            <Header />
            <Banner></Banner>
            <HomePageProduct></HomePageProduct>
            <Footer></Footer>
        </div>
    );
};

export default Home;