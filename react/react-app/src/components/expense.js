import React from "react";
import moment from 'moment'
import {connect} from "react-redux";
import {deleteExpensesRequest} from "../redux/actions/expensesActions";
import UpdateExpense from "./updateExpense";

const Expense = props => {

    return(
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-2">
            <div className="bg-light shadow card p-2 d-flex flex-row justify-content-between h-100">
                <div className="p-2 h-100">
                    <h6 className="card-title">{props.expense.name}</h6>
                    <p className="card-text">
                        <small className="text-dark"><i className="bi bi-cash-coin text-warning"></i> {props.expense.cost} руб.</small><br/>
                        <small className="text-dark"><i className="bi bi-calendar-event text-info"></i> {moment(props.expense.dateTime).format('ll')}</small><br/>
                        <small className="text-dark"><i className="bi bi-cart2 text-success"></i> {props.expense.expenseType.name}</small><br/>
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-around">
                    <button className="btn btn-info" data-toggle="modal" data-target={'#updateExpense'+ props.expense.id}><i className="bi bi-pencil text-white"></i></button>
                    <button onClick={() => props.deleteExpensesRequest(props.expense.id)} className="btn btn-danger"><i className="bi bi-trash text-white"></i></button>
                </div>

                <UpdateExpense expense={props.expense}/>

            </div>
        </div>
    )
}

const mapDispatchToProps = {
    deleteExpensesRequest
}

export default connect(null, mapDispatchToProps)(Expense)