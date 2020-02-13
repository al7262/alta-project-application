import React from 'react';
import '../styles/customer.css'
import {formatMoney} from 'accounting'

const CustomerList = (props) => {
    return (
        <React.Fragment>
            <div className="row customer-box" data-toggle="collapse" data-target={"#customer"+props.id} 
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <div className="col-9 name">
                    <i className="material-icons">account_circle</i>
                    <h5>{props.name===''?"No Name":props.name}</h5>
                </div>
                <div className="col-3 price">
                    <i className="material-icons">edit</i>
                </div>
            </div>
            <div className="collapse" id={"customer"+props.id}>
                <div className="row customer-detail">
                    <div className="col-12">
                        <h5>Detail Pelanggan</h5>
                    </div>
                    <hr className="w-100"/>
                    <div className="col-4 name">Nama</div>
                    <div className="col-8 price">: {props.name}</div>
                    <div className="col-4 name">No. Telepon</div>
                    <div className="col-8 price">: {props.phone!==''?props.phone:'Tidak Dimasukkan'}</div>
                    <div className="col-4 name">Email</div>
                    <div className="col-8 price">: {props.email!==''?props.email:'Tidak Dimasukkan'}</div>
                    <div className="col-4 name">Transaksi</div>
                    <div className="col-8 price">: {props.transaction}</div>
                    <div className="col-4 name">Bergabung sejak</div>
                    <div className="col-8 price">: {props.date.split('-')[0]}</div>
                </div>
            </div>             
        </React.Fragment>
    )
}

export default CustomerList;