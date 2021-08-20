import React, {useState} from "react";
import ErrorsList from "./ErrorsList";
import FormCheck from "./formCheck";



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

const RadioGroup = props => {

    const [styles, setStyles] = useState(baseStyles)
    const [errors, setErrors] = useState(["Поле не должно быть пустым"])


    function onInputHandler(event){
        props.setSelectedFieldValue(event.target.value)
        props.setFieldValidResult(true)
        setErrors([])
        setStyles(successStyles)
    }

    return(
        <div onInput={onInputHandler} className={styles.textStyle + styles.borderStyle}>
            <h6>{props.title}</h6>
            <ErrorsList errors={errors}/>
            {props.values.map(value => <FormCheck key={value.id} value={value}/>)}
        </div>
    )
}

export default RadioGroup