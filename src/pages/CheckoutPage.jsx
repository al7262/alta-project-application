import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/checkout.css';
import { formatMoney } from 'accounting';
import swal from 'sweetalert2';

import HeaderSimple from '../components/HeaderSimple';
import Loader from '../components/Loader';

class CheckoutPage extends React.Component {
    state={
        itemList: undefined,
        promoList: undefined,
        payment: undefined,
        customer: undefined,
        promo: undefined,
        amountPaid: undefined,
        finishGetCustomer: false,
        totalItemPrice: 0,
        taxAmount: 0,
        totalEverything: 0,
        finishChecking: false,
        order:undefined,
    }

    componentWillMount = async() =>{
        await this.props.checkLoginStatus()
        this.setState({finishChecking:true})
    }

    componentDidMount = async () => {
        this.setState({itemList:JSON.parse(localStorage.getItem('cart'))})
        this.props.getCustomer();
        this.setState({finishGetCustomer: true})
        await this.props.getOutletDetails()
        this.countOrderDetails()
    }

    handleOnChange = async (event) =>{
        const name=event.target.name;
        let value = event.target.value;
        if(name==='customer'){
            if(Array.isArray(this.props.CustomerList)){
                const addButton = document.getElementById('addCustomer')
                let isMatch=false;
                const valRegex = new RegExp(value.toLowerCase())
                isMatch = await this.props.CustomerList.some(element => {
                    if(element.toLowerCase().match(valRegex)){
                        return true
                    }
                    return false
                });
                if(!isMatch){
                    addButton.setAttribute('class','btn btn-add-customer')
                } else{
                    addButton.setAttribute('class','btn btn-add-customer disabled')
                }
            }
            if(value!==''){
                value = await value[0].toUpperCase()+value.slice(1)
            }
        }
        await this.setState({[name]: value})
    }

    handleHeaderButton = () => {
        this.props.emptyCart()
        this.props.history.push('/')
    }

    countOrderDetails = async () => {
        let outletDetails = await this.props.outletDetails
        let totalPrice = 0, tax;
        if(outletDetails!==undefined){
            tax = outletDetails.tax
        }
        if(Array.isArray(this.state.itemList)){
            this.state.itemList.forEach(item => {
                totalPrice += item.data.price*item.qty
            });
        }
        const taxAmount = totalPrice*tax/100
        await this.setState({totalItemPrice: totalPrice, taxAmount: taxAmount, totalEverything: (totalPrice+taxAmount)})
        this.state.amountPaid=this.state.totalEverything
    }

    postOrder = async(dict) =>{
        const input = {
            method: "post",
            url: await this.props.baseUrl+"product/checkout",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            data: dict,
            validateStatus: (status) => {
                return status<500
            }
        };
        await this.props.handleApi(input)
        const data = await this.props.data
        await this.setState({order:data.result})
        this.props.handleReset()
    }

    handleCheckout = () =>{
        const order = this.state.itemList.map(item=>{
            return '<div class="row"><div class="col-6 item-name">'+item.data.name+'</div><div class="col-2 item-qty">x'+item.qty+'</div><div class="col-4 price">'+formatMoney(item.data.price*item.qty, "Rp", 2, '.', ',')+'</div></div>'
        })
        swal.fire({
            title: 'Confirmed?',
            html: order,
            icon: 'question',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#F26101',
            cancelButtonColor: '#003354',
            showCancelButton: true
        }).then(result => {
            if(result.value){
                swal.fire({
                    title: 'Processing your order....',
                    timer: 3000,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        let customer = this.state.customer, customerId=null, customerName
                        if(customer!==undefined){
                            customer=await customer.split('-')
                            if(Array.isArray(customer)){
                                customerId = customer[0]
                                customerName = customer[1]
                            } else{
                                customerName=customer
                            }
                        }
                        const data = {
                            item_list: this.state.itemList,
                            promo:'',
                            payment_method: this.state.payment,
                            paid_price: this.state.amountPaid,
                            id_customers: customerId,
                            id_outlet: this.props.outlet,
                            name: customerName,
                        }
                        await this.postOrder(data)
                    },
                    onClose: async () => {
                        swal.fire({
                        title: 'Order Processed!',
                        icon: 'info',
                        confirmButtonText: 'Roger',
                        confirmButtonColor: '#F26101',
                        })
                        localStorage.removeItem('cart')
                        this.props.history.push('/')
                    }
                })
            } 
        })
    }

    render(){
        if(this.props.outlet===undefined){
            return <Redirect to="/"></Redirect>
        }
        if(!this.state.finishChecking){
            return <Loader
                height='100vh'
                scale='3'/>
        }
        if(!this.props.isLogin){
            return <Redirect to='/login'/>
        }
        return (
            <React.Fragment>
                <HeaderSimple
                icon="delete"
                title="Checkout"
                handleOnClick={this.handleHeaderButton}/>
                <div className="container-fluid bg-checkout">
                    <div className="container limited">
                        <div className="row section-box">
                            <h5>
                                Rangkuman Pesanan
                            </h5>
                            <hr/>
                            <div className="container-fluid order-summary">
                                {Array.isArray(this.state.itemList)?
                                this.state.itemList.map(item=>(
                                    <div className="row">
                                        <div className="col-6 item-name">{item.data.name}</div>
                                        <div className="col-2 item-qty">x{item.qty}</div>
                                        <div className="col-4 price">{formatMoney(item.data.price*item.qty, "", 0, '.')}</div>
                                    </div>
                                )):null}
                                <div className="row">
                                    <hr/>
                                </div>
                                <div className="row">
                                    <div className="col-8 item-name">Total Harga Barang</div>
                                    <div className="col-4 price">{formatMoney(this.state.totalItemPrice, "", 0,".")}</div>
                                </div>
                                <div className="row">
                                    <div className="col-8 item-name">Pajak Toko(10%)</div>
                                    <div className="col-4 price">+{formatMoney(this.state.taxAmount, "", 0,".")}</div>
                                </div>
                                <div className="row">
                                    <hr/>
                                </div>
                                <div className="row">
                                    <div className="col-8 item-name">Total Keseluruhan</div>
                                    <div className="col-4 price">{formatMoney(this.state.totalEverything, "", 0,".")}</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row section-box">
                            <h5>
                                Pilihan Promo
                            </h5>
                            <hr/>
                            <form className="promo-form was-validated" onSubmit={e=>e.preventDefault()}>
                                <label htmlFor="promo" className="wrap">
                                    <select name="promo" onChange={e=>this.handleOnChange(e)}>
                                        <option value="" selected disabled>Pilih Promo</option>
                                        <option value="Merdeka">Merdeka</option>
                                    </select>
                                    <span>
                                        <i className="material-icons">arrow_drop_down_circle</i>
                                    </span>
                                </label>
                            </form>
                        </div> */}
                        <div className="row section-box">
                            <h5>
                                Detail Pelanggan
                            </h5>
                            <hr/>
                            <form className="customer-form" autoComplete="off" onSubmit={e=>e.preventDefault()}>
                            {this.state.finishGetCustomer?
                            <React.Fragment>
                                <input list="customer" name="customer" onChange={e=>this.handleOnChange(e)}/>
                                <datalist id="customer">
                                    {Array.isArray(this.props.customerList)?
                                    this.props.customerList.map(item=>(
                                        <option value={item.id+'-'+item.fullname}>{item.fullname} ({item.phone_number!==''?item.phone_number:item.email})</option>
                                        ))
                                        :null}
                                </datalist>
                                <button className="btn btn-add-customer disabled" id="addCustomer">+add</button>
                            </React.Fragment>
                            :
                            <Loader/>
                            }
                            </form>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Pilihan Cara Bayar
                            </h5>
                            <hr/>
                            <form className="payment-form" onSubmit={e=>e.preventDefault()}>
                                <div class="payment-choice">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="card" name="payment" value="card" class="custom-control-input" onChange={e=>this.handleOnChange(e)} disabled/>
                                        <label class="custom-control-label" for="card">Card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="cash" name="payment" value="cash" class="custom-control-input" onChange={e=>this.handleOnChange(e)}/>
                                        <label class="custom-control-label" for="cash">Cash</label><br/>
                                        {this.state.payment==='cash'?
                                        <input type="number" min={this.state.totalEverything} name="amountPaid" value={this.state.amountPaid} onChange={e=>this.handleOnChange(e)}/>
                                        :null
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="checkout-button">
                        <Link className="btn btn-back" to="/order">
                            <i className="material-icons">arrow_back_ios</i>
                            <span>Kembali</span>
                        </Link>
                        <Link className={"btn btn-checkout " + (this.state.amountPaid===undefined||this.state.amountPaid===''?'disabled':'')} onClick={this.handleCheckout} onDoubleClick={null}>
                            <span>Selesai</span>
                            <i className="material-icons">arrow_back_ios</i>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('customerList, outletDetails, isLogin, outlet, baseUrl', actions)(withRouter(CheckoutPage));