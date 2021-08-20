import React from "react";

const FormCheck = props => {
    return(
        <div className="form-check">
            <input className="form-check-input" type="radio" name="radio" value={props.value.id}/>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
                {props.value.name}
            </label>
        </div>
    )
}

export default FormCheck