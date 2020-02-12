import React from 'react';
import '../styles/search-bar.css';

const SearchBarAbove = (props) => {
    return(
        <React.Fragment>
            <div className="search-container">
                <form action="" onSubmit={e=>e.preventDefault()}>
                    <input type="text" name="search" value={props.search} 
                    onChange={e=>props.handleOnChange(e)}
                    placeholder={props.placeholder}/>
                    <i className="material-icons">search</i>
                </form>
            </div>
        </React.Fragment>
    )
}

export default SearchBarAbove;