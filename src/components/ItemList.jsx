import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/item-list.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';
import image from '../images/background.jpg'

const ItemList = (props) => {
    return(
        <React.Fragment>
                <div className="col-xl-4 col-lg-6 item-box">
                    <Link className="item-inside">
                        <div className="img-box">
                            <img src={image} alt="product-item"/>
                        </div>
                        <div className="content-box">
                            <label>asdfghjkqwertyuioplmnbvcxzasdfghjkloiuytrewqasdfg</label>
                            <span>Rp100.000,00</span>
                            <div className="button-box">
                                {props.qty===0||props.qty===undefined?
                                <div className="btn btn-info btn-add">
                                    <Link>
                                        <i className="material-icons">add</i>
                                        <span>add</span>
                                    </Link>
                                </div>
                                :
                                <div className="btn btn-add">
                                    <Link id="add">
                                        <i className="material-icons">add</i>
                                    </Link>
                                    <span id="qty">{props.qty}</span>
                                    <Link id="remove">
                                        <i className="material-icons">remove</i>
                                    </Link>
                                </div>
                                }
                            </div>
                        </div>
                    </Link>
                </div>
        </React.Fragment>
    )
}

export default connect('', actions)(withRouter(ItemList))