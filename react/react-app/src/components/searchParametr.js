import React from "react";

const SearchParametr = props => {
    return(
        <div className="row justify-content-around align-items-center  my-2">
            <h6 className="col-4">{props.blockName}</h6>
            <div className="col-4 d-flex flex-row align-items-center">
                <label className="px-2">От</label>
                <input type={props.fieldType} className="form-control"
                       onChange={event => props.minValueHandler(event.target.value)}/>
            </div>
            <div className="col-4 d-flex flex-row align-items-center">
                <label className="px-2">До</label>
                <input type={props.fieldType} className="form-control"
                       onChange={event => props.maxValueHandler(event.target.value)}/>
            </div>
        </div>
    )
}

export default SearchParametr