import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/home.css'
import background from '../images/background2.jpg';
import logo from  '../images/logo-light.svg';

import Header from '../components/Header';
import Loader from '../components/Loader';

class HomePage extends React.Component {
    state={
        finishChecking: false,
        finishGetInfo: false,
        isLoading: true,
    }
    componentDidMount = async() =>{
        await this.props.checkLoginStatus();
        await this.props.handleInput('outlet', undefined)
        this.setState({finishChecking:true})
        if(this.props.isOwner){
            await this.props.getOwnerInformation()
            this.setState({finishGetInfo:true})
            await this.props.getOutlet()
            this.setState({isLoading:false})
        } else{
            console.log(this.props.claims)
            await this.props.getEmployeeInformation()
            this.setState({finishGetInfo:true})
        }
    }

    componentWillUnmount = () => {
        this.props.handleReset()
    }

    render(){
        if(!this.state.finishChecking){
            return <Loader
                height='100vh'
                scale='3'/>
        }
        if(!this.props.isLogin){
            return <Redirect to="/login"></Redirect>
        }
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
                        <h1>Selamat Datang, {this.state.finishGetInfo? this.props.cashierName:'Loading...'}</h1>
                        <h6>Apa yang ingin anda lakukan?</h6>
                        {this.props.isOwner?
                        <form action="" className="outlet-choice" onSubmit={e=>e.preventDefault()}>
                            <span>Outlet yang dipilih: </span>
                            <select name="outlet" id="outlet" defaultValue="" onChange={this.props.handleOnChange}>
                                <option value="" disabled>Pilih Outlet</option>
                                {this.state.isLoading?
                                <option value="" disabled>
                                    loading....
                                </option>
                                :
                                Array.isArray(this.props.outletList)?
                                this.props.outletList.map((item, key)=>(
                                    <option key={key} value={item.id}>{item.name}</option>
                                ))
                                :null
                                }
                            </select>
                        </form>
                        :null
                        }
                        <div className="button-group">
                            <Link className={"btn btn-info btn-choice " + (this.props.outlet===undefined? 'disabled': '')} to='/order' onClick={()=>this.props.emptyCart()}>
                                <span>Pesanan Baru</span>
                            </Link>
                            <Link className={"btn btn-info btn-choice " + (this.props.outlet===undefined? 'disabled': '')} to=''>
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
export default connect('isLogin, isOwner, outletList, cashierName, outlet, claims', actions)(withRouter(HomePage));