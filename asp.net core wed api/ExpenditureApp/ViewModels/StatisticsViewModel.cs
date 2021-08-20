using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.ViewModels
{
    public class StatisticsViewModel
    {
        public double TotalExpensesForTheMonth { get; set; }
        public double AverageMonthlyExpenses { get; set; }

        public Dictionary<string, double> StatisticsForTheMonth { get; set; }
        public Dictionary<string, double> StatisticsOnAverangeForTheMonth { get; set; }
    }
}
