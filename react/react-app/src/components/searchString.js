import React from "react";

const SearchString = props => {
    return(
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="Название покупки"
                onChange={event => props.setSearchString(event.target.value)}/>

                <div className="btn-group">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Тип
                    </button>
                    <div className="input-group-prepend" onClick={event => {props.setExpenseTypeId(event.target.id)}}>
                        <div className="dropdown-menu">
                            {props.expenseTypes.map(expense =>
                                <span className="dropdown-item" key={expense.id} id={expense.id}>{expense.name}</span>)}
                        </div>
                    </div>
                </div>
                <div className="btn-group">
                    <input type="submit" value="Найти" className="btn btn-outline-success"/>
                </div>

            </div>
        </div>
    )
}

export default SearchString