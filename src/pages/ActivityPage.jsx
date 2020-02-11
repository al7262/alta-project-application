import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/activity.css'

import Header from '../components/Header';
import SearchBarAbove from '../components/SearchBarAbove';

class ActivityPage extends React.Component {
    state = {
        search: '',
        finishChecking: false,
    }
    componentWillMount = async() =>{
        await this.props.checkLoginStatus()
        this.setState({finishChecking:true})
    }
    componentDidMount = () => {

    }
    handleSearch = (event) => {
        const name = event.target.name
        let value = event.target.value
        this.setState({[name]:value})
    }
    render(){
        return (
            <React.Fragment>
                <Header
                pageLocation='Aktivitas'/>
                <SearchBarAbove
                search={this.state.search}
                handleOnChange={this.handleSearch}
                placeholder='Cari nomor order'/>
                <div className="container-fluid bg-activity">
                    <div className="container activity-limited">
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(ActivityPage));