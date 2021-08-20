import React, {useEffect, useMemo, useState} from "react";
import {validateEmail, validatePassword, validateRequiredField} from "../app/validationScripts";
import ErrorsList from "./ErrorsList";

const successStyles = {
    textStyle: "text-success ",
    borderStyle: "border-success ",
}

const dangerStyles = {
    textStyle: "text-danger ",
    borderStyle: "border-danger ",
}

const baseStyles = {
    textStyle: "text-dark ",
    borderStyle: "text-dark "
}

export const InputGroup = props => {
    const [styles, setStyles] = useState({})
    const [errors, setErrors] = useState([])

    const validate = useMemo(() => {
        switch (props.fieldType) {
            case "password": return validatePassword
            case "email": return validateEmail
            default: return validateRequiredField
        }
    }, [])

    function updateFieldState(errors){
        if(!errors.length){
            setStyles(successStyles)
            setErrors([]);
            props.setFieldValidResult(true)
        }
        else{
            setStyles(dangerStyles)
            setErrors(errors);
            props.setFieldValidResult(false)
        }
    }

    useEffect(() => {
        updateFieldState(props.requestErrors ?? [])
    }, [props.requestErrors])

    useEffect(() => {
        setStyles(baseStyles)
        props.setFieldValidResult(false)
    }, [])

    function onChangeHandler(event) {
        let errors = validate(event.target.value)
        updateFieldState(errors)
    }

    return(
        <div className="my-3">
            <h6><label className={styles.textStyle}>{props.labelText}</label></h6>
            <input ref={props.inputRef} onChange={onChangeHandler} type={props.fieldType} className={"form-control " + styles.textStyle + styles.borderStyle}/>
            <ErrorsList errors={errors} />
        </div>
    )
}

export default InputGroup;