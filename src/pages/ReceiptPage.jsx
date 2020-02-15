import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import HeaderSimple from '../components/HeaderSimple';
import ReceiptFormat from '../components/ReceiptFormat';
import Loader from '../components/Loader';
import htmlToImage from 'html-to-image';
import printJs from 'print-js';
import swal from 'sweetalert2';


class ReceiptPage extends React.Component {
    state = {
        isLoading: true,
        finishChecking: false
    }
    componentDidMount = async () => {
        await this.props.checkLoginStatus()
        this.setState({finishChecking:true})
        await this.props.getOrderDetails()
        this.setState({isLoading: false})
    }

    handleHeaderButton = () => {
        this.resetOrder()
        this.props.history.push('/')
    }
    
    resetOrder = () =>{
        this.props.handleInput('order', undefined)
        this.props.handleInput('orderDetails', undefined)
    }

    componentWillUnmount=()=>{
        this.resetOrder()
    }

    receiptToImageSave = () => {
        swal.showLoading()
        const receipt = document.getElementById('receipt')
        // const time = Date.now()
        // const name = 'receipt-'+time.toString()
        htmlToImage
        .toJpeg(receipt)
        .then((dataUrl) => {
            printJs(dataUrl, 'image')
            swal.close()
        });
    }

    handleSendReceipt = (input) => {
        swal.showLoading()
        const receipt = document.getElementById('receipt')
        htmlToImage
        .toBlob(receipt)
        .then(async (dataUrl) => {
            await this.props.sendImage(dataUrl, input)
            swal.close()
        });
    }

    render(){
        let data;
        if(this.props.orderDetails!==undefined){
            data = this.props.orderDetails
        }

        if(this.props.order===undefined){
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
                icon="home"
                title="Receipt"
                handleOnClick={this.handleHeaderButton}/>
                <div className="container-fluid bg-checkout">
                    <div className="container limited receipt-limited d-flex justify-content-center">
                        {this.state.isLoading||data===undefined?
                        <Loader loading="hidden"/>:<ReceiptFormat data = {data}/>}
                    </div>
                    <div className="receipt-button">
                        <Link className="btn btn-email" onClick={()=>this.handleSendReceipt('email')}>
                            <i className="material-icons">email</i>
                            <span>Email</span>    
                        </Link>
                        <Link className="btn btn-whatsapp" onClick={()=>this.handleSendReceipt('whatsapp')}>
                            <i className="material-icons">message</i>
                            <span>Whatsapp</span>    
                        </Link>
                        <Link className="btn btn-print" onClick={this.receiptToImageSave}>
                            <i className="material-icons">print</i>
                            <span>Print</span>    
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('orderDetails, order, isLogin', actions)(withRouter(ReceiptPage));