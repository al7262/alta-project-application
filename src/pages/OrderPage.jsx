import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/order.css'

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import CategoryList from '../components/CategoryList';
import ItemList from '../components/ItemList';

class OrderPage extends React.Component {
    render(){
        let dataToShow = <CategoryList/>;
        console.log(this.props)
        const category = this.props.match.params.category
        if(category!==undefined){
            dataToShow = <ItemList
                qty={0}/>
        }
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
                                {dataToShow}
                                {category!==undefined?
                                <div className="col-xl-4 col-lg-6 back-box">
                                    <Link className="back-inside" to='/order'>
                                        <i className="material-icons">reply</i>
                                        <span>Kembali ke halaman kategori</span>
                                    </Link>
                                </div>
                                : null
                                }
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