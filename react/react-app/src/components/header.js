import { NavLink } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import {connect} from "react-redux";
import {logout} from "../redux/actions/accountActions";
import {store} from "../redux/store";

const Header = props => {

    const unAuthorizedNavLinks = 
    <>
        <li className="nav-item">
            <h6><NavLink to="/login" className="nav-link" activeClassName="text-info">Войти</NavLink></h6>
        </li>
        <li className="nav-item">
            <h6><NavLink to="/register" className="nav-link" activeClassName="text-info">Регистрация</NavLink></h6>
        </li>
    </>

    const authorizedNavLinks = 
    <>
        <li className="nav-item">
            <h6><NavLink to="/expenditure" className="nav-link" activeClassName="text-info">Расходы</NavLink></h6>
        </li>
        <li className="nav-item">
            <h6><NavLink to="/logout" className="nav-link text-danger">Выход</NavLink></h6>
        </li>
    </>

    return(
        <header className="bg-light shadow">
            <div className="container d-flex flex-row align-items-center justify-content-between">
                <h5 className="text-dark">Expenditure App</h5>
                <ul className="nav">    
                    {props.auth ? authorizedNavLinks : unAuthorizedNavLinks}
                </ul>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({auth: state.account.auth})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)