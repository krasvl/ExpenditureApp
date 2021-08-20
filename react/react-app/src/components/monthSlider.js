import moment from "moment";
import React from "react";

const MonthSlider = props => {

    return(
        <div className="text-center text-dark pt-3">
            <h5>
                <i onClick={props.substractMonth} className="bi bi-caret-left"></i>
                <span className="px-2">{moment({month: props.month}).format('MMMM')}, {props.year}</span>
                <i onClick={props.addMonth} className={"bi bi-caret-right" + (props.month == props.currentMonth ? "d-none" : "")}></i>
            </h5>
        </div>
    )
}

export default MonthSlider