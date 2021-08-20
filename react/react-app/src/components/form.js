import React, {useEffect, useState} from "react";

const Form = props => {
    const [formValidResult, setFormValidResult] = useState(Array(props.children.length).fill(false))

    const childrenWithExtraProp = React.Children.map(props.children, (child, i) =>
        React.cloneElement(child, {
                setFieldValidResult: state => setFormValidResult(formValidResult => formValidResult.map((item, j) => j == i ? state : item)
            ) })
    );

    function onSubmitHandler(event){
        event.preventDefault()
        props.request()
    }

    return(
        <div>
            <form action="" onSubmit={onSubmitHandler}>
                <h4 className="text-center">{props.formName}</h4>
                {childrenWithExtraProp}
                <div className="text-center">
                    <input type="submit" className={"btn " + (formValidResult.includes(false) ? "btn-outline-danger disabled" : "btn-outline-success")} value="Отправить"/>
                </div>
            </form>
        </div>
    )
}
export default Form;