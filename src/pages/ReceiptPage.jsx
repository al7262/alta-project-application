import React from 'react';
import { withRouter } from "react-router-dom";
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

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('data', actions)(withRouter(ReceiptPage));