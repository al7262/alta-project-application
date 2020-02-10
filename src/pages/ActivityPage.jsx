import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';

class ActivityPage extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Header
                pageLocation='Aktivitas'/>
                <SearchBarAbove/>

            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(ActivityPage));