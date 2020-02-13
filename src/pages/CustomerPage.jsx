import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/customer.css';

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import Loader from '../components/Loader';
import CustomerList from '../components/CustomerList';

class CustomerPage extends React.Component {
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
        await this.props.getCustomer()
        await this.setState({data:this.props.customerList})
        console.log(this.props.data)
        this.setState({isLoading:false})
    }
    
    handleSearch = async(event) => {
        const name = event.target.name
        let value = event.target.value
        this.setState({[name]:value})
        this.props.history.replace('/customer?search='+value)
        if(value===''){
            this.props.history.replace('/customer')
        }
        console.log(this.props)
        this.setState({isLoading:true})
        await this.props.getCustomer(value)
        this.setState({isLoading:false})
    }

    render(){
        let customers, dataToShow
        if(this.state.data!==undefined){
            customers = this.state.data
            dataToShow = customers.map(item=>{
                return <CustomerList
                    id = {item.id}
                    name = {item.fullname}
                    phone = {item.phone_number}
                    email = {item.email}
                    transaction = {item.total_transaction}
                    date = {item.created_at}
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
                pageLocation='Pelanggan'/>
                <SearchBarAbove
                search={this.state.search}
                handleOnChange={this.handleSearch}
                placeholder='Cari pelanggan'/>
                <div className="container-fluid bg-customer">
                    <div className="container customer-limited">
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
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('customerList, baseUrl, outlet, isLogin', actions)(withRouter(CustomerPage));