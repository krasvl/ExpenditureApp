import InputGroup from "./input-group";
import Form from "./form";
import React, {useRef, useState} from "react";
import {registerRequest} from "../redux/actions/accountActions";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const Register = props => {
    const email = useRef("")
    const password = useRef("")
    const firstName = useRef("")
    const lastName = useRef("")

    const [errors, setErrors] = useState({
        emailErrors: [],
        passwordErrors: []
    })

    function errorsHandler(requestData) {
        setErrors({
            emailErrors: requestData.emailValidationErrors,
            passwordErrors: requestData.passwordValidationErrors
        })
    }

    function request() {
        props.registerRequest(
            email.current.value,
            password.current.value,
            firstName.current.value,
            lastName.current.value,
            errorsHandler)
    }

    if (props.auth) {
        return <Redirect to='/expenditures'/>
    }

    return(
        <div className="row justify-content-center">
            <div className="bg-light col-md-6 p-5 shadow mt-5 rounded">
                <Form formName="Регистрация" request={ request }>
                    <InputGroup requestErrors={errors.emailErrors} inputRef={email} fieldType="email" labelText="Email"/>
                    <InputGroup requestErrors={errors.passwordErrors} inputRef={password} fieldType="password" labelText="Пароль"/>
                    <InputGroup inputRef={firstName} fieldType="text" labelText="Имя"/>
                    <InputGroup inputRef={lastName} fieldType="text" labelText="Фамилия"/>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ( {auth: state.account.auth} )
const mapDispatchToProps = {registerRequest}

export default connect(mapStateToProps, mapDispatchToProps)(Register);