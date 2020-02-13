import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/order.css';
import { formatMoney } from 'accounting';

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';
import CategoryList from '../components/CategoryList';
import ItemList from '../components/ItemList';
import Loader from '../components/Loader';
class OrderPage extends React.Component {
    state = {
        search: '',
        isLoading: true,
        finishChecking: false,
        totalItem: 0,
        totalPrice: 0
    }

    componentWillMount = async () =>{
        await this.props.checkLoginStatus();
        this.setState({finishChecking:true})
    }

    componentDidMount = async () =>{
        await this.props.getCategory();
        this.setState({isLoading:false})
        console.log(this.props.categoryList)
    }

    handleOnClickCategory = async (input) => {
        const category = input.replace(" ", "-")
        this.props.history.push('/order/'+category)
        this.setState({isLoading:true})
        await this.props.getItem(input)
        this.setState({isLoading:false})
    }

    updateCartData = async() => {
        let totalItem=0, totalPrice=0;
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(Array.isArray(cart)){
            cart.forEach(item=>{
                totalItem+=item.unit
                totalPrice+=(item.price*item.unit)
            })
        }
        this.state.totalPrice=totalPrice
        this.state.totalItem=totalItem
    }

    handleSearch = async(event) => {
        const name = event.target.name
        let value = event.target.value
        this.setState({[name]:value})
        this.props.history.replace('/order/search?name='+value)
        if(value===''){
            this.props.history.replace('/order')
        }
        this.setState({isLoading:true})
        await this.props.getItem(undefined, value)
        this.setState({isLoading:false})
    }

    render(){
        let dataToShow;
        const category = this.props.match.params.category
        if(category!==undefined){
            if(this.props.itemList!==undefined){
                const cart=JSON.parse(localStorage.getItem('cart'))
                dataToShow = this.props.itemList.map(item=>{
                    let qty;
                    if(Array.isArray(cart)){
                        cart.forEach(cartItem=>{
                            if(cartItem.id===item.id){
                                qty=cartItem.unit
                            }
                        })
                    }
                    return <ItemList
                    data={item}
                    name={item.name}
                    id={item.id}
                    price={item.price}
                    stock={item.stock}
                    image={item.image}
                    qty={qty}/>
                })
            }
        } else if(this.props.categoryList!==undefined){
            dataToShow = this.props.categoryList.map(item=>{
                return <CategoryList
                name={item}
                handleOnClick={this.handleOnClickCategory}/>
            })
        }
        this.updateCartData()

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
                pageLocation='Pesanan'/>
                <SearchBarAbove
                    search={this.state.search}
                    handleOnChange={this.handleSearch}
                    placeholder='Cari nama barang'/>
                {this.state.isLoading?
                <div className="order-container-loader">
                    <Loader scale='1.5'/>
                </div>
                :
                <div className="container-fluid mt-lg-5">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="row">
                                {dataToShow}
                                {category!==undefined?
                                <div className="col-xl-4 col-lg-6 back-box">
                                    <Link className="back-inside" to='/order'>
                                        <i className="material-icons">reply</i>
                                        <span>Kembali ke halaman kategori</span>
                                    </Link>
                                </div>
                                : null
                                }
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                    <div className="row col-12 gap-150" id="gap"></div>
                </div>
                }
                {!Array.isArray(JSON.parse(localStorage.getItem('cart')))?null:
                <div className="cart-box fixed-bottom">
                    <Link className="checkout" to="/checkout">
                        <i className="material-icons">shopping_basket</i>
                        <div className="details">
                            <span>Total barang: {this.state.totalItem}</span>
                            <h5>{formatMoney(this.state.totalPrice, "Rp", 2, ".", ",")}</h5>
                        </div>
                    </Link>
                    <Link className="clear-cart" onClick={()=>this.props.emptyCart()}>
                        <i className="material-icons">block</i>
                    </Link>
                </div>
                }
            </React.Fragment>
        )
    }
}
export default connect('isLogin, itemList, categoryList, outlet', actions)(withRouter(OrderPage));