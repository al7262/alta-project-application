import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/header.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';
import logo from '../images/logo-light.svg';

const Header = (props) => {
    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-blue justify-content-end fixed-top">
                <Link className="navbar-brand d-lg-flex d-none" to="/">
                    <img src={logo} alt="application-logo" style={{height:'50px'}}/>
                    <span>EasyKachin'</span>
                </Link>
                <span id="header-location" className="d-lg-none d-block">{props.pageLocation}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" onClick={props.handleTogglerNavbar}>
                    <i className="material-icons" style={{fontSize:"32px"}} id="navbarToggler">menu</i>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 text-right pr-4">
                        <li className={"nav-item " + (props.pageLocation==='Beranda'? 'active' : '')}>
                            <Link className="nav-link" to="/">Beranda</Link>
                        </li>
                        <li className={"nav-item " + (props.pageLocation==='Pesanan'? 'active' : '')}>
                            <Link className={"nav-link " + (props.outlet===undefined?'disabled':'')} to={props.outlet===undefined?'/':'/order'}>Pesanan</Link>
                        </li>
                        <li className={"nav-item " + (props.pageLocation==='Aktivitas'? 'active' : '')}>
                            <Link className={"nav-link " + (props.outlet===undefined?'disabled':'')} to={props.outlet===undefined?'/':'/order'}>Aktivitas</Link>
                        </li>
                        <li className={"nav-item " + (props.pageLocation==='Pelanggan'? 'active' : '')}>
                            <Link className={"nav-link " + (props.outlet===undefined?'disabled':'')} to={props.outlet===undefined?'/':'/order'}>Pelanggan</Link>
                        </li>
                        <li className={"nav-item " + (props.pageLocation==='Inventaris'? 'active' : '')}>
                            <Link className={"nav-link " + (props.outlet===undefined?'disabled':'')} to={props.outlet===undefined?'/':'/order'}>Inventaris</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default connect('outlet', actions)(withRouter(Header));