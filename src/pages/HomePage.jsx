import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";

import Header from '../components/Header';

class HomePage extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(HomePage));