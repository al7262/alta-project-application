import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/search-bar.css';
import { connect } from "unistore/react";
import { actions } from '../stores/MainStore';

const SearchBarAbove = (props) => {
    return(
        <React.Fragment>
                <div className="search-container">
                    <form action="" onSubmit={e=>e.preventDefault()}>
                        <input type="text" name="search" value={props.search} onChange={e=>props.handleOnChange(e)}/>
                        <i className="material-icons">search</i>
                    </form>
                </div>
            </React.Fragment>
    )
}

export default connect('search', actions)(withRouter(SearchBarAbove))