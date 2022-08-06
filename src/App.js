import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Home from './Components/HomePage/Home';
import Registration from './Components/Registration/Registration';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Error from './Components/Error/Error';
import Dashboard from './Components/Dashboard/Dashboard';
import SellerList from './Components/Admin/SellerList';
import About from './Components/About/About';
import OrderList from './Components/Admin/OrderList';
import ProductList from './Components/Admin/ProductList';
import CustomerList from './Components/Admin/CustomerList';
import ServiceProviderList from './Components/Admin/ServiceProviderList';
import AddSeller from './Components/Admin/AddSeller';
import AddCustomer from './Components/Admin/AddCustomer';
import AddServiceProvider from './Components/Admin/AddServiceProvider';
import UpdateSeller from './Components/Admin/UpdateSeller';
import UpdateCustomer from './Components/Admin/UpdateCustomer';
import UpdateServiceProvider from './Components/Admin/UpdateServiceProvider';
import SellerProducts from './Components/Seller/SellerProducts';
import SellerOrders from './Components/Seller/SellerOrders';
import AddProduct from './Components/Seller/AddProduct';
import UpdateProduct from './Components/Seller/UpdateProduct';
import CustomerError from './Components/Customer/CustomerError';
import ProductDetails from './Components/Customer/ProductDetails';
import PlaceOrder from './Components/Customer/PlaceOrder';
import CustomerServiceReview from './Components/Customer/CustomerServiceReview';
import CustomerProductReview from './Components/Customer/CustomerProductReview';
import CustomerOrders from './Components/Customer/CustomerOrders';
import UpdateCustomerOrder from './Components/Customer/UpdateCustomerOrder';


import ServiceProviderNotes from './Components/ServiceProvider/ServiceProviderNotes';
import ServiceProviderDeliveries from './Components/ServiceProvider/ServiceProviderDeliveries';
import ServiceProviderReviews from './Components/ServiceProvider/ServiceProviderReviews';
import ServiceProviderOrders from './Components/ServiceProvider/ServiceProviderOrders';
import ServiceProviderMakeDelivery from './Components/ServiceProvider/ServiceProviderMakeDelivery';
import UpdateDelivery from './Components/ServiceProvider/UpdateDelivery';
import MakeNote from './Components/ServiceProvider/MakeNote';
import UpdateNote from './Components/ServiceProvider/UpdateNote';
import CustomerProductDelivery from './Components/Customer/CustomerProductDelivery';
import AddServiceRating from './Components/Customer/AddServiceRating';
import UpdateServiceReview from './Components/Customer/UpdateServiceReview';
import AddProductRating from './Components/Customer/AddProductRating';
import UpdateProductReview from './Components/Customer/UpdateProductReview';
import UpdateSellerOrder from './Components/Seller/UpdateSellerOrder';
import SellerSingleProductReview from './Components/Seller/SellerSingleProductReview';
import SellerProductList from './Components/Admin/SellerProductList';
import CustomerOrderList from './Components/Admin/CustomerOrderList';
import ServiceProviderDeliveryList from './Components/Admin/ServiceProviderDeliveryList';
import UpdateAdminProfile from './Components/Admin/UpdateAdminProfile';
import UpdateCustomerProfile from './Components/Customer/UpdateCustomerProfile';
import UpdateSellerProfile from './Components/Seller/UpdateSellerProfile';
import UpdateServiceProviderProfile from './Components/ServiceProvider/UpdateServiceProviderProfile';
import Herbals from './Components/ProductCategory/Herbals';
import Personal from './Components/ProductCategory/Personal';
import Medicine from './Components/ProductCategory/Medicine';
import Supplement from './Components/ProductCategory/Supplement';





// Authorization
// var token = null;
// if (localStorage.getItem('token')) {
//   token = localStorage.getItem('token')
// }
// axios.defaults.headers.common["Authorization"] = token;
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/contact"><Contact></Contact></Route>
          <Route path="/products"><Products></Products></Route>
          <Route path="/dashboard"><Dashboard></Dashboard></Route>
          <Route path="/herbals"><Herbals></Herbals> </Route>
          <Route path="/personal"><Personal></Personal> </Route>
          <Route path="/medicine"><Medicine></Medicine> </Route>
          <Route path="/supplement"><Supplement></Supplement> </Route>

          <Route path="/login">
            {
              localStorage.getItem('token') ?
                <Redirect to="/" />
                : <Login></Login>
            }
          </Route>
          <Route path="/registration">
            {
              localStorage.getItem('token') ?
                <Redirect to="/" />
                : <Registration></Registration>
            }
          </Route>

          {/* For Admin start*/}
          <Route path="/updateAdminProfile"><UpdateAdminProfile></UpdateAdminProfile> </Route>
          <Route path="/orderList"><OrderList></OrderList></Route>
          <Route path="/productList"><ProductList></ProductList></Route>
          

          {/* seller  operation for admin*/}
          <Route path="/sellerList"><SellerList></SellerList></Route>
          <Route path="/addSeller"><AddSeller></AddSeller></Route>
          <Route path="/updateSeller/:id"><UpdateSeller></UpdateSeller></Route>
          <Route path="/sellerProductList/:id"><SellerProductList></SellerProductList> </Route>

          {/* ServiceProvider operation for admin */}
          <Route path="/serviceProviderList"><ServiceProviderList></ServiceProviderList></Route>
          <Route path="/addServiceProvider"><AddServiceProvider></AddServiceProvider></Route>
          <Route path="/updateServiceProvider/:id"><UpdateServiceProvider></UpdateServiceProvider></Route>
          <Route path="/serviceProviderDeliveryList/:id"><ServiceProviderDeliveryList></ServiceProviderDeliveryList> </Route>

          {/* customer operation for admin */}
          <Route path="/customerList"><CustomerList></CustomerList></Route>
          <Route path="/addCustomer"><AddCustomer></AddCustomer></Route>
          <Route path="/updateCustomer/:id"><UpdateCustomer></UpdateCustomer></Route>
          <Route path="/customerOrderList/:id"><CustomerOrderList></CustomerOrderList> </Route>
          {/*  admin end */}


          {/* for seller start */}
          <Route path="/updateSellerProfile"><UpdateSellerProfile></UpdateSellerProfile> </Route>
          <Route path="/sellerProducts/:sellerId"><SellerProducts></SellerProducts> </Route>
          <Route path="/sellerOrders/:sellerId"><SellerOrders></SellerOrders> </Route>
          <Route path="/addProduct"><AddProduct></AddProduct> </Route>
          <Route path="/updateProduct/:id"><UpdateProduct></UpdateProduct> </Route>
          <Route path="/updateSellerOrder/:id"><UpdateSellerOrder></UpdateSellerOrder> </Route>
          <Route path="/productReview/:id"><SellerSingleProductReview></SellerSingleProductReview> </Route>

          {/* seller end */}



          {/* customer start */}
          <Route path="/productDetails/:id">
            {
              localStorage.getItem('role') === 'customer' ?
                <ProductDetails></ProductDetails> :
                <CustomerError></CustomerError>
            }
          </Route>
          <Route path="/updateCustomerProfile"><UpdateCustomerProfile></UpdateCustomerProfile> </Route>
          <Route path="/placeOrder/:id"><PlaceOrder></PlaceOrder> </Route>
          <Route path="/customerServiceReviews/:id"><CustomerServiceReview></CustomerServiceReview> </Route>
          <Route path="/customerProductReviews/:id"><CustomerProductReview></CustomerProductReview> </Route>
          <Route path="/customerOrders/:id"><CustomerOrders></CustomerOrders> </Route>
          <Route path="/updateCustomerOrder/:id"><UpdateCustomerOrder></UpdateCustomerOrder> </Route>
          <Route path="/customerProductDeliveries/:id"><CustomerProductDelivery></CustomerProductDelivery> </Route>
          <Route path="/addServiceRating/:id"><AddServiceRating></AddServiceRating> </Route>
          <Route path="/updateServiceReview/:id"><UpdateServiceReview></UpdateServiceReview> </Route>
          <Route path="/addProductRating/:id"><AddProductRating></AddProductRating> </Route>
          <Route path="/updateProductReview/:id"><UpdateProductReview></UpdateProductReview> </Route>
          {/* customer end */}


          {/* service provider area start */}
          <Route path="/updateServiceProviderProfile"><UpdateServiceProviderProfile></UpdateServiceProviderProfile> </Route>
          <Route path="/serviceProviderNotes/:id"><ServiceProviderNotes></ServiceProviderNotes> </Route>
          <Route path="/serviceProviderDeliveries/:id"><ServiceProviderDeliveries></ServiceProviderDeliveries> </Route>
          <Route path="/serviceProviderReviews/:id"><ServiceProviderReviews></ServiceProviderReviews> </Route>
          <Route path="/serviceProviderOrders"><ServiceProviderOrders></ServiceProviderOrders> </Route>
          <Route path="/addToDelivery/:id"><ServiceProviderMakeDelivery></ServiceProviderMakeDelivery> </Route>
          <Route path="/updateDelivery/:id"><UpdateDelivery></UpdateDelivery> </Route>
          <Route path="/makeNote"><MakeNote></MakeNote> </Route>
          <Route path="/updateNote/:id"><UpdateNote></UpdateNote> </Route>




          <Route path="/error"><Error></Error></Route>
          <Route path="/about"><About></About></Route>
          <Route exact path="/"><Home></Home></Route>
          <Route path="*"><Error></Error></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;