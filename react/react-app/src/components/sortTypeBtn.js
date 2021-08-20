import React from "react";

const SortTypeBtn = props => {
    return(
        <div className="btn-group">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Упорядочить по
            </button>
            <div className="input-group-prepend" onClick={event => props.setSortType(event.target.id)}>
                <div className="dropdown-menu">
                    <span className="dropdown-item" id="dateDesc">Убыванию даты</span>
                    <span className="dropdown-item" id="date">Возрастанию даты</span>
                    <span className="dropdown-item" id="costDesc">Убыванию цены</span>
                    <span className="dropdown-item" id="cost">Возрастанию цены</span>
                    <span className="dropdown-item" id="expenseType">Типу</span>
                </div>
            </div>
        </div>
    )
}

export default SortTypeBtn