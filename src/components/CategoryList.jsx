import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/category-list.css';

const CategoryList = (props) => {
    return(
        <React.Fragment>
            <div className="col-lg-4 category-box">
                <Link className="category-inside" onClick = {() => props.handleOnClick(props.name)}>
                    <i className="material-icons">widgets</i>
                    <span>{props.name}</span>
                    <i className="material-icons next d-lg-none d-block">navigate_next</i>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default CategoryList;