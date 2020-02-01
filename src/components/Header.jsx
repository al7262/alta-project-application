import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/header.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';

const Header = (props) => {
    return(
        <React.Fragment>
            <nav class="navbar navbar-expand-lg navbar-dark bg-blue justify-content-end">
                <Link class="navbar-brand d-lg-block d-none" to="/">
                    <span>EasyKachin'</span>
                </Link>
                <span id="header-location"></span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" onClick={props.handleTogglerNavbar}>
                    <i className="material-icons" style={{fontSize:"32px"}} id="navbarToggler">menu</i>
                </button>

                <div class="collapse navbar-collapse text-right pr-4" id="navbar">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Order</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Activity</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Customer</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Inventory</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default connect('', actions)(withRouter(Header));