import React from 'react';
import '../styles/receipt.css';
import logo from '../images/logo-dark.svg';

const ReceiptFormat = (props) => {
    return (
        <React.Fragment>
            <div className="receipt-container shadow" id="receipt">
                <div className="receipt-logo">
                    <img src={logo} alt="logo-business"/>
                    <h1>CoffeeShop</h1>
                </div>
                <div className="receipt-address">
                    <p>Jalan Tidar no.23, Karangbesuki, Kota Malang, JawaTimur +6281291427292</p>
                </div>
                <hr/>
                <div className="receipt-order">
                    <div className="row">
                        <h6 className="key">No. Order</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.order}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Pelanggan</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.customer}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Tanggal</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.date}</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Pegawai</h6>
                        <h6 className="separator">:</h6>
                        <h6 className="value">{props.employee}</h6>
                    </div>
                </div>
                <hr />
                <div className="receipt-item">
                    {!Array.isArray(props.itemList)? null:
                    props.itemList.map(item=>(
                    <div className="row">
                        <div className="item-name">
                            <h6>item1</h6>
                            <span>@15.000</span>
                        </div>
                        <h6 className="item-qty">1</h6>
                        <h6 className="item-price">15.000</h6>
                    </div>
                    ))
                    }
                </div>
                <hr/>
                <div className="receipt-calculation">
                    <div className="row">
                        <h6 className="key">Total Harga</h6>
                        <h6 className="value">15.000</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Diskon</h6>
                        <h6 className="value">0.00</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Pajak</h6>
                        <h6 className="value">1.500</h6>
                    </div>
                    <hr/>
                    <div className="row">
                        <h6 className="key">Total Biaya</h6>
                        <h6 className="value">16.500</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Dibayar</h6>
                        <h6 className="value">20.000</h6>
                    </div>
                    <div className="row">
                        <h6 className="key">Kembalian</h6>
                        <h6 className="value">3.500</h6>
                    </div>
                </div>
                <div className="app-logo">
                    <img src={logo} alt="application-logo"/>
                    <h1>EasyKachin'</h1>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ReceiptFormat;