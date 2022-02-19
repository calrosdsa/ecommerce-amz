import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes,Route,useParams  } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Payment from './components/payments/Payment';
import CheckOut from './components/products/CheckOut';
import './index.css';
import { Provider } from 'react-redux';
import store from './store'
import App from './App';
import Header from './components/products/Header';
import Product from './components/product/Product'
import  FilterProduct from './components/filters/FilterProduct';
import Footer from './components/products/Footer';
ReactDOM.render(
  <React.StrictMode>

<Provider store={store}>
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='payment' element={<Payment/>}/>
    <Route  path='register' element={<Register />} />
    <Route  path='login' element={<Login />} />
    <Route path='cart' element={<CheckOut />}/>
    <Route path='filter' element={<FilterProduct />}/>
    <Route path='product/:slug' element={<Product />}/>

  </Routes>
  <Footer/>
  </BrowserRouter>
</Provider>
</React.StrictMode>,
  document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
