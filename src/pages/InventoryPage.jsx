import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/inventory.css';
import {formatMoney} from 'accounting';

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import Loader from '../components/Loader';
import InventoryList from '../components/InventoryList';

class InventoryPage extends React.Component {
    state = {
        search: '',
        finishChecking: false,
        data: undefined,
        isLoading: true,
    }

    componentWillMount = async() =>{
        await this.props.checkLoginStatus()
        this.setState({finishChecking:true})
    }

    componentDidMount = async () => {
        await this.getInventoryList()
        this.setState({isLoading:false})
    }
    
    getInventoryList = async (search=undefined)=>{
        const input = {
            method: "get",
            url: await this.props.baseUrl+"inventory/1",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                name: search
            },
            validateStatus: (status) => {
                return status<500
            }
        }
        await this.props.handleApi(input)
        this.setState({data:this.props.data})
        console.log(this.state.data)
    }

    handleSearch = async(event) => {
        const name = event.target.name
        let value = event.target.value
        this.setState({[name]:value})
        this.props.history.replace('/inventory?search='+value)
        if(value===''){
            this.props.history.replace('/inventory')
        }
        console.log(this.props)
        this.setState({isLoading:true})
        await this.getInventoryList(value)
        this.setState({isLoading:false})
    }

    render(){
        let inventories, dataToShow, almostFinished
        if(this.state.data!==undefined){
            almostFinished = this.state.data.below_reminder
            inventories = this.state.data.inventories
            dataToShow = inventories.map(item=>{
                return <InventoryList
                    id = {item.id}
                    name = {item.name}
                    unit = {item.unit}
                    unitPrice = {item.unit_price}
                    stock = {item.stock}
                    status = {item.status}
                    />
            })
        }
        console.log(dataToShow)
        // if(this.props.outlet===undefined){
        //     return <Redirect to="/"></Redirect>
        // }
        // if(!this.state.finishChecking){
        //     return <Loader
        //         height='100vh'
        //         scale='3'/>
        // }
        // if(!this.props.isLogin){
        //     return <Redirect to='/login'/>
        // }
        return (
            <React.Fragment>
                <Header
                pageLocation='Inventaris'/>
                <SearchBarAbove
                search={this.state.search}
                handleOnChange={this.handleSearch}
                placeholder='Cari nama bahan'/>
                <div className="container-fluid bg-inventory">
                    <div className="container inventory-limited">
                        <div className="container-fluid h-100">
                            {this.state.isLoading?
                            <div className="h-100 d-flex justify-content-center align-items-center">
                                <Loader/>
                            </div>
                            :dataToShow.length===0? 
                                this.state.search!==''?
                                <h4 className="text-center pt-5">Pencarian tidak ditemukan</h4>
                                :<h4 className="text-center pt-5">Belum ada barang di inventaris</h4>
                            :dataToShow}
                            <div className="row gap-100"></div>
                        </div>
                        <div className="container summary-limited fixed-bottom">
                            <div className="inventory-summary">
                                <i className="material-icons">warning</i>
                                <div className="summary-detail">
                                    <h6>Sudah hampir habis</h6>
                                    <h4>Jumlah Bahan: {almostFinished}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('data, baseUrl, outlet, isLogin', actions)(withRouter(InventoryPage));