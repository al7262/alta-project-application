import React from 'react';
import { Link } from "react-router-dom";
import '../styles/header-simple.css'

const HeaderSimple = (props) => {
    return (
        <React.Fragment>
            <div className="container-header fixed-top">
                <div className="inside-header">
                    <Link onClick={props.handleOnClick}>
                        <i className="material-icons">{props.icon}</i>
                    </Link>
                    <span>{props.title}</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HeaderSimple;