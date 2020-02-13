import React from 'react';
import '../styles/inventory.css'
import {formatMoney} from 'accounting'

const InventoryList = (props) => {
    return (
        <React.Fragment>
            <div className="row inventory-box" data-toggle="collapse" data-target={"#inventory"+props.id} 
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <div className="col-8 name">
                    <i className="material-icons">unarchive</i>
                    <h5>{props.name===''?"No Name":props.name}</h5>
                </div>
                <div className="col-4 price">
                    <h5>{props.stock}{props.unit}</h5>
                </div>
            </div>
            <div className="collapse" id={"inventory"+props.id}>
                <div className="row inventory-detail">
                    <div className="col-12">
                        <h5>Detail Inventaris</h5>
                    </div>
                    <hr className="w-100"/>
                    <div className="col-4 name">Unit</div>
                    <div className="col-8 price">: {props.unit}</div>
                    <div className="col-4 name">Harga(/{props.unit})</div>
                    <div className="col-8 price">: {formatMoney(props.unitPrice, "Rp", 2, ".", ",")}</div>
                    <div className="col-4 name">Status</div>
                    <div className="col-8 price">: {props.status}</div>
                </div>
            </div>             
        </React.Fragment>
    )
}

export default InventoryList;