import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/activity.css';
import {formatMoney} from 'accounting';

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import ActivityList from '../components/ActivityList';
import Loader from '../components/Loader';

class ActivityPage extends React.Component {
    state = {
        search: '',
        finishChecking: false,
        data: undefined,
        date: 'Hari Ini',
        isLoading: true,
    }

    componentWillMount = async() =>{
        await this.props.checkLoginStatus()
        this.setState({finishChecking:true})
    }

    componentDidMount = async () => {
        await this.getActivityList(this.state.date)
        this.setState({isLoading:false})
    }
    
    getActivityList = async (date, search=undefined)=>{
        const input = {
            method: "get",
            url: await this.props.baseUrl+"activity/"+this.props.outlet,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                date: date,
                order_code: search
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
        this.props.history.replace('/activity?search='+value)
        if(value===''){
            this.props.history.replace('/activity')
        }
        console.log(this.props)
        this.setState({isLoading:true})
        await this.getActivityList(this.state.date, value)
        this.setState({isLoading:false})
    }

    handleChangeDate = async (input) =>{
        const date = document.getElementById('datePlaceholder')
        const currentDate = date.innerHTML
        const hideBtn = document.getElementById(input)
        const showBtn = document.getElementById(currentDate)
        hideBtn.setAttribute('class', 'disabled')
        showBtn.removeAttribute('class')
        date.innerHTML = input
        await this.setState({date:input, isLoading:true, search:''})
        await this.getActivityList(this.state.date)
        this.setState({isLoading:false})
    }
    
    render(){
        let totalTransaction, totalSales, transactions, dataToShow
        if(this.state.data!==undefined){
            totalTransaction = this.state.data.total_transactions
            totalSales = this.state.data.total_sales
            transactions = this.state.data.transaction_detail
            dataToShow = transactions.map(item=>{
                return <ActivityList 
                    name = {item.name}
                    time = {item.time}
                    order = {item.order_code}
                    total = {item.total_payment}
                    totalItem = {item.total_item}
                    listItem = {item.item_detail}
                    />
            })
        }
        console.log(dataToShow)
        if(this.props.outlet===undefined){
            return <Redirect to="/"></Redirect>
        }
        if(!this.state.finishChecking){
            return <Loader
                height='100vh'
                scale='3'/>
        }
        if(!this.props.isLogin){
            return <Redirect to='/login'/>
        }
        return (
            <React.Fragment>
                <Header
                pageLocation='Aktivitas'/>
                <SearchBarAbove
                search={this.state.search}
                handleOnChange={this.handleSearch}
                placeholder='Cari nomor order'/>
                <div className="container-fluid bg-activity">
                    <div className="container date-option">
                        <Link id="Kemarin" onClick={this.state.date==='Kemarin'?null:()=>this.handleChangeDate('Kemarin')}>
                            <i className="material-icons">arrow_left</i>
                        </Link>
                        <h6 id="datePlaceholder">Hari Ini</h6>
                        <Link className="disabled" id="Hari Ini" onClick={this.state.date==='Hari Ini'?null:()=>this.handleChangeDate('Hari Ini')}>
                            <i className="material-icons">arrow_right</i>
                        </Link>
                    </div>
                    <div className="container activity-limited">
                        <div className="container-fluid h-100">
                            {this.state.isLoading?
                            <div className="h-100 d-flex justify-content-center align-items-center">
                                <Loader/>
                            </div>
                            :dataToShow.length===0? 
                                this.state.search!==''?
                                <h4 className="text-center pt-5">Pencarian tidak ditemukan</h4>
                                :<h4 className="text-center pt-5">Belum ada riwayat aktivitas</h4>
                            :dataToShow}
                            <div className="row gap-100"></div>
                        </div>
                        <div className="container summary-limited fixed-bottom">
                            <div className="activity-summary">
                                <i className="material-icons">library_books</i>
                                <div className="summary-detail">
                                    <h6>Total Penjualan: {totalTransaction}</h6>
                                    <h4>{formatMoney(totalSales, 'Rp', 2, '.', ',')}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('data, baseUrl, outlet, isLogin', actions)(withRouter(ActivityPage));