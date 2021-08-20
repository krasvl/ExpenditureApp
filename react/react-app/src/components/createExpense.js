import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import moment from 'moment'

import Form from "./form";
import InputGroup from "./input-group";
import {createExpenseRequest, updateExpenseRequest} from "../redux/actions/expensesActions";
import RadioGroup from "./ragioGroup";

const CreateExpense = props => {

    const name = useRef("")
    const cost = useRef(0)
    const [expenseTypeId, setExpenseTypeId] = useState()

    const [successMessage, setSuccessMessage] = useState()



    function request() {
        props.createExpenseRequest({
            dateTime: moment().format(),
            name: name.current.value,
            cost: Number.parseInt(cost.current.value),
            expenseTypeId: expenseTypeId
        })
        setSuccessMessage(<h6><div className="text-success">Успешно создано <i className="bi bi-check-lg"></i></div></h6>)

    }

    function removeSuccessMessage() {
        setSuccessMessage(null)
    }

    return(
        <div className="modal fade" id='createExpense' tabIndex="-1"aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Создать</h5>
                        <button type="button" onClick={removeSuccessMessage} className="close btn btn-outline-danger" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" onChange={removeSuccessMessage}>
                        <div className="text-center">
                            {successMessage}
                        </div>
                        <Form className="modal-body" request={ request }>
                            <InputGroup inputRef={name} fieldType="text" labelText='Название'/>
                            <InputGroup inputRef={cost} fieldType="number" labelText='Цена'/>
                            <RadioGroup setSelectedFieldValue={setExpenseTypeId} title='Тип'values={props.expenseTypes}/>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    createExpenseRequest
}

const mapStateToProps = state => ({
    expenseTypes: state.expenses.expenseTypes
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense)