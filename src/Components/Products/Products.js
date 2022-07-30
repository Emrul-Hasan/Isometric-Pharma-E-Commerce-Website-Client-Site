import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AllProductCard from './AllProductCard';

const Products = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProduct(response.data[2]);
            console.log(response.data);
        })
    }, []);
    return (
        <div>
            <Header />
            <div className="container" style={{ margin: "0 auto" }}>
        <h3 className='fw-bold text-uppercase mt-5'>    All Products</h3>
                <div className="row mt-3">
                    {
                        product.map(product => <AllProductCard key={product.id} product={product}></AllProductCard>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Products;