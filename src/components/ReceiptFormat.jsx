import React from 'react';
import '../styles/receipt.css';
import logo from '../images/logo-dark.svg';
import { formatMoney } from 'accounting';

const ReceiptFormat = (props) => {
    return (
        <React.Fragment>
            <div id='receipt'>
            <div className="receipt-container shadow">
                <div className="receipt-logo">
                    <img src={props.data.logo} alt="logo-business"/>
                    <h1>{props.data.business_name}</h1>
                </div>
                <div className="receipt-address">
                    <p>{props.data.address} - {props.data.phone_number}</p>
                </div>
                <hr/>
                <div className="receipt-order">
                    <div className="row">
                        <h6 className="key">No. Order</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.data.order}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Pelanggan</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.data.customer_name}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Tanggal</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.data.time}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Pegawai</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.data.cashier_name}</h6>
                    </div>
                </div>
                <hr />
                <div className="receipt-item">
                    {!Array.isArray(props.data.items_list)? null:
                    props.data.items_list.map(item=>(
                    <div className="row">
                        <div className="item-name">
                            <h6>{item.product_name}</h6>
                            <span>@{formatMoney(item.unit_price, "", 0,".")}</span>
                        </div>
                        <h6 className="item-qty">{item.quantity}</h6>
                        <h6 className="item-price">{formatMoney(item.total_price, "Rp", 0, ".",",")}</h6>
                    </div>
                    ))
                    }
                </div>
                <hr/>
                <div className="receipt-calculation">
                    <div className="row">
                        <h6 className="key">Total Harga</h6>
                        <h6 className="value">{formatMoney(props.data.transaction_total_price, "Rp", 0, ".",",")}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Diskon</h6>
                        <h6 className="value">{formatMoney(props.data.discount, "Rp", 0, ".",",")}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Pajak</h6>
                        <h6 className="value">{formatMoney(props.data.tax, "Rp", 0, ".",",")}</h6>
                    </div>
                    <hr/>
                    <div className="row">
                        <h6 className="key">Total Biaya</h6>
                        <h6 className="value">{formatMoney(props.data.to_paid, "Rp", 0, ".",",")}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Dibayar</h6>
                        <h6 className="value">{formatMoney(props.data.paid, "Rp", 0, ".",",")}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Kembalian</h6>
                        <h6 className="value">{formatMoney(props.data.return, "Rp", 0, ".",",")}</h6>
                    </div>
                </div>
                <div className="app-logo">
                    <img src={logo} alt="application-logo"/>
                    <h1>EasyKachin'</h1>
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default ReceiptFormat;