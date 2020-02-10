import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import HeaderSimple from '../components/HeaderSimple';
import ReceiptFormat from '../components/ReceiptFormat';


class ReceiptPage extends React.Component {
    state = {
        data: undefined
    }
    componentDidMount = async () => {
        await this.props.checkLoginStatus()
        this.setState({data: this.props.data})
    }

    handleHeaderButton = () => {
        this.props.handleInput('order', undefined)
        this.props.history.push('/')
    }

    render(){
        return (
            <React.Fragment>
                <HeaderSimple
                icon="home"
                title="Receipt"
                handleOnClick={this.handleHeaderButton}/>
                <div className="container-fluid bg-checkout">
                    <div className="container limited receipt-limited">
                            <ReceiptFormat/>
                    </div>
                    <div className="receipt-button">
                        <Link className="btn btn-email">
                            <i className="material-icons">email</i>
                            <span>Email</span>    
                        </Link>
                        <Link className="btn btn-whatsapp">
                            <i className="material-icons">message</i>
                            <span>Whatsapp</span>    
                        </Link>
                        <Link className="btn btn-print">
                            <i className="material-icons">print</i>
                            <span>Print</span>    
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('data', actions)(withRouter(ReceiptPage));