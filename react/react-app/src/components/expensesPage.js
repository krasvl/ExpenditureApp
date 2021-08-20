import React, {useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import moment from 'moment'
import {Redirect} from "react-router";

import {
    getExpensesByCurrentMonthRequest,
    getExpensesRequest,
    getExpenseTypesRequest, getStatisticsRequest, updateSelectedMonthsDate
} from "../redux/actions/expensesActions";
import Expenses from "./expenses";
import SearchString from "./searchString";
import SearchParametr from "./searchParametr";
import SortTypeBtn from "./sortTypeBtn";
import MonthSlider from "./monthSlider";
import CreateExpense from "./createExpense";
import Statistics from "./Statistics";

const ExpenditurePage = props => {
    const currentMonth = useMemo(() => moment().month(),[])
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(moment().year())
    const [searchInfo, setSearchInfo] = useState()
    const [sortType, setSortType] = useState('dateDesc')
    const [searchBlockVisibility, setSearchBlockVisibility] = useState(false)

    const [searchString, setSearchString] = useState()
    const [expenseTypeId, setExpenseTypeId] = useState()
    const [minCost, setMinCost] = useState()
    const [maxCost, setMaxCost] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()


    useEffect(() => {
        props.getExpenseTypesRequest()
        props.getExpensesByCurrentMonthRequest(moment({year: year, month: month, day: 1}))
    },[])

    useEffect(() => {
        props.updateSelectedMonthsDate(moment({year: year, month: month, day: 1}))
        props.getExpensesByCurrentMonthRequest(moment({year: year, month: month, day: 1}))
    },[month])

    function getExpenses(event) {
        event.preventDefault()
        setSearchInfo(`
        Результаты поиска по ${searchString ? 'названию: ' + searchString + ', ': '' } 
        типу товара: ${expenseTypeId != null ? props.expenseTypes.find(u => u.id == expenseTypeId).name : 'любой'}, 
        цене: ${!maxCost && !minCost ? 'любая' : (
            (minCost ? 'от: ' + minCost + ' ' : '') +
            (maxCost ? 'до: ' + maxCost + ' ' : '') )} , 
        дате: ${!startDate && !endDate ? 'любая' : (
            (startDate ? 'от: ' + startDate + ' ' : '') +
            (endDate ? 'до: ' + endDate + ' ' : '') )}`)
        props.getExpensesRequest({searchString, startDate, endDate, minCost, maxCost, expenseTypeId})
    }

    function addMonth() {
        if(month != 11){
            setMonth(month => month + 1)
        }
        else {
            setMonth(0)
            setYear(year => year + 1)
        }
        setSearchInfo(null)
    }

    function substractMonth() {
        if(month != 0){
            setMonth(month => month - 1)
        }
        else {
            setMonth(11)
            setYear(year => year - 1)
        }
        setSearchInfo(null)
    }

    if(!props.auth) {
        return <Redirect to={{
            pathname: '/login',
            state: {message: 'Время сессии истекло'}
        }}/>
    }

    return(
        <div className="row justify-content-around p-3">
            <div className="col-md-3 col-sm-0 rounded bg-light shadow py-5 px-2 d-flex flex-column align-items-center">

                <div className="text-center">
                    <h6>Здравствуйте,</h6>
                    <h5>{props.user.firstName} {props.user.lastName}</h5>
                </div>

                <div className="w-100 text-center my-3 py-3 border-2 border-bottom border-top">
                    <button className="btn btn-success text-white " data-toggle="modal" data-target='#createExpense'>
                        <span className="mx-3">Создать</span>
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    <CreateExpense expenseTypes={props.expenseTypes}/>
                </div>

                <Statistics
                    totalExpensesForTheMonth={props.statistics.totalExpensesForTheMonth}
                    averageMonthlyExpenses={props.statistics.averageMonthlyExpenses}
                    statisticsForTheMonth={props.statistics.statisticsForTheMonth}
                    statisticsOnAverangeForTheMonth={props.statistics.statisticsOnAverangeForTheMonth} />


            </div>
            <div className="col-8">

                <div className="p-2 bg-light rounded text-center shadow my-2" onClick={() => setSearchBlockVisibility(visibility => !visibility)}>
                    <h6>Расширенный поиск {searchBlockVisibility ? <i className="bi bi-caret-up"></i> : <i className="bi bi-caret-down"></i>}</h6>
                </div>

                <form onSubmit={event => getExpenses(event)} className={searchBlockVisibility ? "" : "d-none"}>
                    <SearchString expenseTypes={props.expenseTypes}
                                  setSearchString={setSearchString} setExpenseTypeId={setExpenseTypeId}/>
                    <div className="p-2 bg-light rounded text-center">
                        <SearchParametr blockName='Цена' fieldType='number' minValueHandler={setMinCost} maxValueHandler={setMaxCost}/>
                        <SearchParametr blockName='Дата' fieldType='date' minValueHandler={setStartDate} maxValueHandler={setEndDate}/>
                    </div>
                </form>

                <MonthSlider month={month} year={year} currentMonth={currentMonth}
                             addMonth={addMonth} substractMonth={substractMonth}/>

                <div className="text-center text-success my-4">
                    <h6>{searchInfo}</h6>
                </div>

                <div className="d-flex flex-row justify-content-end">
                    <SortTypeBtn setSortType={setSortType}/>
                </div>

                <Expenses expenses={props.expenses} sortType={sortType}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.account.user,
    auth: state.account.auth,
    expenses: state.expenses.expenses,
    expenseTypes: state.expenses.expenseTypes,
    statistics: state.expenses.statistics,
    selectedMonthsDate: state.expenses.selectedMonthsDate
})

const mapDispatchToProps = {
    getExpensesByCurrentMonthRequest,
    getExpenseTypesRequest,
    getExpensesRequest,
    updateSelectedMonthsDate
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenditurePage)