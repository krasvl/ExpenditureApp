import React, {useEffect, useState} from "react";
import Expense from "./expense";

const Expenses = props => {
    const [sort, setSort] = useState(() => (ex1, ex2) => ex2.dateTime > ex1.dateTime ? 1 : -1)

    useEffect(() => {
        switch (props.sortType) {
            case 'date':
                setSort(() => (ex1, ex2) => ex2.dateTime < ex1.dateTime ? 1 : -1)
                break
            case 'dateDesc':
                setSort(() => (ex1, ex2) => ex2.dateTime > ex1.dateTime ? 1 : -1)
                break
            case 'cost':
                setSort(() => (ex1, ex2) => ex2.cost < ex1.cost ? 1 : -1)
                break
            case 'costDesc':
                setSort(() => (ex1, ex2) => ex2.cost > ex1.cost ? 1 : -1)
                break
            case 'expenseType':
                setSort(() => (ex1, ex2) => ex2.expenseType.id > ex1.expenseType.id ? 1 : -1)
                break
        }
    }, [props.sortType])

    return(
        <div className="row">
            {props.expenses.sort(sort).map((expense,i) => <Expense key={i} expense={expense}/>)}
        </div>
    )
}

export default Expenses