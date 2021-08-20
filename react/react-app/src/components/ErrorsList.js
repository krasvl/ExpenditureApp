import React from "react";

const ErrorsList = props =>{
    return(
        <div className="d-flex flex-column">{props.errors.map((error, key) => <small className="text-danger" key={key}>{error}</small>)}</div>
    )
}

export default ErrorsList