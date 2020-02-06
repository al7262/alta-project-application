import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";

import Header from '../components/Header';

import '../styles/notmatch.css'

class NotMatchPage extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <div class="box">
                    <div>
                        close !
                    </div>
                    <p><span>error 404 !</span> sorry page isn't found for one of the reformes </p>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(NotMatchPage));