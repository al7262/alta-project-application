import React from 'react';
import { Link } from "react-router-dom";
import '../styles/header-simple.css'
import {formatMoney} from 'accounting'

const ActivityList = (props) => {
    return (
        <React.Fragment>
            <div className="row activity-box" data-toggle="collapse" data-target={"#order"+props.order} 
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <div className="col-7 name">
                    <span>#{props.order} {props.time}</span>
                    <h6>{props.name===''?"No Name":props.name}</h6>
                </div>
                <div className="col-5 price">
                    <h5>{formatMoney(props.total, "Rp", 2, ".", ",")}</h5>
                </div>
            </div>
            <div className="collapse" id={"order"+props.order}>
                <div className="row activity-detail">
                    <div className="col-12">
                        <h5>Detail Transaksi</h5>
                    </div>
                    <hr className="w-100"/>
                    {props.listItem===undefined?null:
                    props.listItem.map(item=>(
                        <React.Fragment>
                            <div className="col-8 name">{item.name}</div>
                            <div className="col-4 price">x{item.quantity}</div>
                        </React.Fragment>
                    ))}
                    <hr className="w-100"/>
                    <div className="col-8 total">Total Item</div>
                    <div className="col-4 price">{props.totalItem} Item</div>
                </div>
            </div>             
        </React.Fragment>
    )
}

export default ActivityList;