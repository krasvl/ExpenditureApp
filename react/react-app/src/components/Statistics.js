import {Pie} from "react-chartjs-2";
import React from "react";

const Statistics = props => {

    function getData(statistics) {
        return {
            labels: Object.keys(statistics),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(statistics),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(209,255,8,0.5)',
                        'rgba(132,212,255,0.5)',
                        'rgba(249,64,255,0.5)',
                        'rgba(0,255,155,0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(209,255,8, 1)',
                        'rgba(132,212,255, 1)',
                        'rgba(249,64,255, 1)',
                        'rgba(0,255,155, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }

    return(
        <div className="text-center">
            <h5>Анализ расходов</h5>
            <p className="text-center text-secondary my-5">
                <h6>За этот месяц</h6>
                <div>
                    <Pie data={getData(props.statisticsForTheMonth)} />
                </div>
                <h5 className={"my-2 " + (props.totalExpensesForTheMonth > props.averageMonthlyExpenses ? "text-danger": "text-success")} >
                    <i className="bi bi-cash-stack"></i> {Math.round(props.totalExpensesForTheMonth)} руб.
                </h5>
            </p>
            <p className="text-center text-secondary my-5">
                <h6>В среднем за месяц</h6>
                <Pie data={getData(props.statisticsOnAverangeForTheMonth)} />
                <h5 className="my-2"><i className="bi bi-cash-stack"></i> {Math.round(props.averageMonthlyExpenses)} руб.</h5>
            </p>
    </div>)
}

export default Statistics