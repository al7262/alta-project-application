import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/category-list.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';

const CategoryList = (props) => {
    return(
        <React.Fragment>
                <div className="col-lg-4 category-box">
                    <Link className="category-inside" to='/order/discount'>
                        <i className="material-icons">local_offer</i>
                        <span>Discounted Items</span>
                        <i className="material-icons next d-lg-none d-block">navigate_next</i>
                    </Link>
                </div>
        </React.Fragment>
    )
}

export default connect('', actions)(withRouter(CategoryList))