import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'unistore/react';
import { store } from '../stores/MainStore';
import HomePage from '../pages/HomePage';


const Mainroute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Mainroute;