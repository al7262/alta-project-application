import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/item-list.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';

const ItemList = (props) => {
    return(
        <React.Fragment>
                <div className="col-lg-4 item-box">
                    <Link className="item-inside">
                        <i className="material-icons">local_offer</i>
                        <span>Discounted Items</span>
                        <i className="material-icons next d-lg-none d-block">navigate_next</i>
                    </Link>
                </div>
        </React.Fragment>
    )
}

export default connect('', actions)(withRouter(ItemList))