import React from 'react';
import { Link } from "react-router-dom";
import '../styles/header-simple.css'

const ActivityList = (props) => {
    return (
        <React.Fragment>
            <div className="row activity-box" data-toggle="collapse" data-target="#order1" 
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <div className="col-7 name">
                    <span>#no.order</span>
                    <h6>Nama customer</h6>
                </div>
                <div className="col-5 price">
                    <h5>Rp10.000,00</h5>
                </div>
            </div>
            <div className="collapse" id="order1">
                <div className="row activity-detail">
                    <div className="col-12">
                        <h5>Item List</h5>
                    </div>
                    <hr className="w-100"/>
                    <div className="col-8 name">item1</div>
                    <div className="col-4 price">x1</div>
                    <hr className="w-100"/>
                    <div className="col-8 total">Total Barang</div>
                    <div className="col-4 price">1</div>
                </div>
            </div>             
        </React.Fragment>
    )
}

export default ActivityList;