import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/home.css'
import background from '../images/background2.jpg';
import logo from  '../images/logo-light.svg';

import Header from '../components/Header';

class HomePage extends React.Component {
    state={
        outlet: undefined
    }
    handleOnChange = (event) =>{
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        return (
            <React.Fragment>
                <Header
                pageLocation='Beranda'/>
                <div className="container-home">
                    <div className="background">
                        <img src={background} alt="background-home"/>
                        <div className="background-mask"></div>
                    </div>
                    <div className="content">
                        <h1>Selamat Datang, username</h1>
                        <h6>Apa yang ingin anda lakukan?</h6>
                        <form action="" className="outlet-choice" onSubmit={e=>e.preventDefault()}>
                            <span>Outlet yang dipilih: </span>
                            <select name="outlet" id="outlet" onChange={this.handleOnChange}>
                                <option value={undefined} selected disabled>Pilih Outlet</option>
                                <option value="bandung">Bandung</option>
                            </select>
                        </form>
                        <div className="button-group">
                            <Link className={"btn btn-info btn-choice " + (this.state.outlet===undefined? 'disabled': '')}>
                                <span>Pesanan Baru</span>
                            </Link>
                            <Link className={"btn btn-info btn-choice " + (this.state.outlet===undefined? 'disabled': '')}>
                                <span>Lihat Aktivitas</span>
                            </Link>
                        </div>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="logo-application"/>
                        <span>EasyKachin'</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(HomePage));