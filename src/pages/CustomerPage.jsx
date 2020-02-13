import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/customer.css';

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import Loader from '../components/Loader';
import CustomerList from '../components/CustomerList';
import Swal from 'sweetalert2';

class CustomerPage extends React.Component {
    state = {
        search: '',
        finishChecking: false,
        data: undefined,
        isLoading: true,
        customerId: undefined,
        name: '',
        phone: '',
        email: '',
        editCustomer: false,
    }

    componentWillMount = async() =>{
        await this.props.checkLoginStatus()
        this.setState({finishChecking:true})
    }

    componentDidMount = async () => {
        await this.getDataCustomer()
    }

    getDataCustomer = async()=>{
        this.setState({isLoading:true})
        await this.props.getCustomer()
        await this.setState({data:this.props.customerList})
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
        await this.setState({data:this.props.customerList})
        this.setState({isLoading:false})
    }

    handleOnChange = async (event) =>{
        const name = event.target.name
        const value = event.target.value
        const warning = document.getElementById('warning')
        const phoneReg = new RegExp(/^[0-9]*$/)
        const emailReg = new RegExp(/^(\w+[.-_]?\w+)@(\w+[.-_]?\w+).(\w{2,3})$/);
        if(name==='name'){
            if(value===''){
                warning.innerHTML = 'Harap masukkan nama pelanggan'
            } else {
                warning.innerHTML = ''
            }
        } else if(name==='phone'){
            if(value===''&&this.state.email===''){
                warning.innerHTML = 'Harap masukkan nomor telepon atau email'
            } else if(!value.match(phoneReg)){
                warning.innerHTML = "Harap masukkan angka saja untuk nomor telepon"
            } else {
                warning.innerHTML = ''
            }
        } else if(name==='email'){
            if(value===''&&this.state.phone===''){
                warning.innerHTML = 'Harap masukkan nomor telepon atau email'
            } else if(!value.match(emailReg)){
                warning.innerHTML = "Harap masukkan email dengan format yang benar"
            } else {
                warning.innerHTML = ''
            }
        }
        this.setState({[name]:value})
    }

    handleEdit = async(index) => {
        const data = this.state.data[index]
        await this.setState({
            name: data.fullname,
            phone: data.phone_number,
            email: data.email,
            customerId: data.id,
            editCustomer: true
        })
    }

    saveCustomer = async () =>{
        let method = "post";
        let endPoint = "customer/create"
        const modal = document.getElementById('customerForm')
        const modalDialog = document.getElementsByClassName('modal-dialog')
        const body = document.getElementsByTagName('body')
        const backdrop = document.getElementsByClassName('modal-backdrop')
        if(this.state.editCustomer){
            method = "put";
            endPoint = "customer/"+this.state.customerId
        }
        Swal.showLoading()
        const input = {
            method: method,
            url: this.props.baseUrl+endPoint,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: {
                fullname: this.state.name,
                phone_number: this.state.phone,
                email: this.state.email
            },
            validateStatus: (status) => {
                return status<500
            }
        }
        await this.props.handleApi(input)
        Swal.close()
        if(this.props.error!==undefined){
            this.props.handleError()
        } else{
            await modal.setAttribute('class', 'modal fade')
            await modal.setAttribute('aria-hidden', 'true')
            await modal.setAttribute('style', 'display:none;')
            await modalDialog[0].removeEventListener('mousedown', Event.MOUSEUP_DISMISS)
            await body[0].setAttribute('class', '')
            await backdrop[0].setAttribute('class', 'modal-backdrop fade')
            await backdrop[0].remove()
        }
        this.resetState();
        this.getDataCustomer();
    }

    resetState = () => {
        this.setState({
            customerId: undefined,
            name: '',
            phone: '',
            email: '',
            editCustomer: false,
        })
    }

    render(){
        let customers, dataToShow
        if(this.state.data!==undefined){
            customers = this.state.data
            dataToShow = customers.map((item,key)=>{
                return <CustomerList
                    key = {key}
                    index = {key}
                    id = {item.id}
                    name = {item.fullname}
                    phone = {item.phone_number}
                    email = {item.email}
                    transaction = {item.total_transaction}
                    date = {item.created_at}
                    handleEdit = {this.handleEdit}
                    />
            })
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
                pageLocation='Pelanggan'/>
                <SearchBarAbove
                search={this.state.search}
                handleOnChange={this.handleSearch}
                placeholder='Cari pelanggan'/>
                {/* Modal */}
                <div class="modal fade" id="customerForm" tabindex="-1" 
                role="dialog" aria-labelledby="customerForm" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content customer-modal">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Form Pelanggan</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <span id="warning"></span>
                                <form onSubmit={e=>e.preventDefault()}>
                                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleOnChange} placeholder="Masukkan Nama Pelanggan"/>
                                    <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleOnChange} placeholder="Masukkan Nomor Telepon"/>
                                    <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleOnChange} placeholder="Masukkan Email"/>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-close" data-dismiss="modal">Tutup</button>
                                <button type="button" class="btn btn-add" onClick={this.saveCustomer}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                        <div className="container customer-add fixed-bottom">
                            <Link className="btn btn-add" data-toggle="modal" 
                            data-target="#customerForm">
                                <i className="material-icons">add</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('customerList, baseUrl, outlet, isLogin', actions)(withRouter(CustomerPage));