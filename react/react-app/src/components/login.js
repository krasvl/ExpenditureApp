import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";

import InputGroup from "./input-group";
import Form from "./form";
import {loginRequest} from "../redux/actions/accountActions";

const Login = props => {
    const email = useRef("")
    const password = useRef("")

    const [errors, setErrors] = useState({
        emailErrors: [],
        passwordErrors: []
    })

    let warnMessage
    if(props.location.state)
        warnMessage = <div className="alert alert-warning text-center" role="alert">{props.location.state.message}</div>

    function errorsHandler(requestData) {
        setErrors({
            emailErrors: requestData.emailValidationErrors,
            passwordErrors: requestData.passwordValidationErrors
        })
    }

    function request() {
        props.loginRequest(email.current.value, password.current.value, errorsHandler)
    }

    if (props.auth) {
        return <Redirect to='/expenditures'/>
    }

    return(
        <div>
            {warnMessage}
            <div className="row justify-content-center">
                <div className="bg-light col-md-6 p-5 shadow mt-5 rounded">
                    <Form formName="Войти" request={ request }>
                        <InputGroup requestErrors={errors.emailErrors} inputRef={email} fieldType="email" labelText="Email"/>
                        <InputGroup requestErrors={errors.passwordErrors} inputRef={password} fieldType="password" labelText="Пароль"/>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({auth: state.account.auth})

const mapDispatchToProps = {
    loginRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);