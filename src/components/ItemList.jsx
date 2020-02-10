import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/item-list.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';
import { formatMoney } from 'accounting'

const ItemList = (props) => {
    return(
        <React.Fragment>
                <div className="col-xl-4 col-lg-6 item-box">
                    <div className="item-inside">
                        <div className="img-box">
                            <img src={props.image} alt="product-item"/>
                        </div>
                        <div className="content-box">
                            <label>{props.name}</label>
                            <span>{formatMoney(props.price, "Rp", 2, ".", ",")}</span>
                            <div className="button-box">
                                {props.qty===0||props.qty===undefined?
                                <div className={"btn btn-info btn-add "+(props.stock===0?'disabled':'')}>
                                    <Link onClick={props.stock===0?null:()=>props.addToCart(props.data)}>
                                        <i className="material-icons">add</i>
                                        <span>add</span>
                                    </Link>
                                </div>
                                :
                                <div className="btn btn-add">
                                    <Link id="remove" onClick={()=>props.updateCart(props.id, -1)}>
                                        <i className="material-icons">remove</i>
                                    </Link>
                                    <span id="qty">{props.qty}</span>
                                    <Link id="add" onClick={props.qty===props.stock? null: ()=>props.updateCart(props.id, 1)}>
                                        <i className="material-icons">add</i>
                                    </Link>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default connect('', actions)(withRouter(ItemList))