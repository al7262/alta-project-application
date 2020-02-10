import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'unistore/react';
import { store } from '../stores/MainStore';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotMatchPage from '../pages/NotMatchPage';
import OrderPage from '../pages/OrderPage';
import CheckoutPage from '../pages/CheckoutPage';
import ReceiptFormat from '../components/ReceiptFormat';
import ReceiptPage from '../pages/ReceiptPage';
// import ActivityPage from '../pages/ActivityPage';


const Mainroute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/checkout" component={CheckoutPage}/>
                    <Route exact path="/receipt" component={ReceiptPage}/>
                    <Route exact path="/order" component={OrderPage}/>
                    {/* <Route exact path="/activity" component={ActivityPage}/> */}
                    <Route exact path="/order/:category" component={OrderPage}/>
                    <Route component={NotMatchPage}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Mainroute;