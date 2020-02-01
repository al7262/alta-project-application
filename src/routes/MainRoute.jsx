import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'unistore/react';
import { store } from '../stores/MainStore';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotMatchPage from '../pages/NotMatchPage';


const Mainroute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route component={NotMatchPage}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Mainroute;