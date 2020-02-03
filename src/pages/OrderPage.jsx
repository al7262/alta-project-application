import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/order.css'

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import CategoryList from '../components/CategoryList';

class OrderPage extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Header 
                pageLocation='Pesanan'/>
                <SearchBarAbove/>
                <div className="container-fluid mt-lg-5">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="row">
                                <CategoryList/>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('search', actions)(withRouter(OrderPage));