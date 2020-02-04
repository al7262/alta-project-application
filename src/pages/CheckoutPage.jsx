import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/checkout.css'

import HeaderSimple from '../components/HeaderSimple';

class CheckoutPage extends React.Component {
    state={
        itemList: undefined,
        promoList: undefined,
        CustomerList: undefined,
        payment: undefined,
        customer: undefined,
        promo: undefined,
    }

    handleOnChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        return (
            <React.Fragment>
                <HeaderSimple
                icon="delete"
                title="Checkout"
                handleOnClick={this.props.handleOnClick}/>
                <div className="container-fluid background">
                    <div className="container limited">
                        <div className="row section-box">
                            <h5>
                                Rangkuman Pesanan
                            </h5>
                            <hr/>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Pilihan Promo
                            </h5>
                            <hr/>
                            <form>
                                <select name="promo">
                                    <option value="" selected disabled>Pilih Promo</option>
                                    <option value="Merdeka">Merdeka</option>
                                </select>
                            </form>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Detail Pelanggan
                            </h5>
                            <hr/>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Pilihan Cara Bayar
                            </h5>
                            <hr/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(CheckoutPage));