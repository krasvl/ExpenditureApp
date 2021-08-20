using ExpenditureApp.Models;
using ExpenditureApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExpenditureApp.DbServices.ExpenseRepository
{
    public interface IExpenseRepository
    {
        Task<StatisticsViewModel> GetStatisticsAsync(string userLogin, DateTime startDate, DateTime endDate);
        Task<Expense> AddExpenseAsync(string userLogin, CreateExpenseViewModel expenseViewModel);
        Task<List<Expense>> GetUsersExpensesAsync(string userLogin);
        Task<List<Expense>> GetUsersExpensesAsync(string userLogin, DateTime? startDate = null, DateTime? endDate = null, string name = null, double? minCost = null, double? maxCost = null, Guid? expenseTypeId = null);
        Task<Expense> RemoveExpenseAsync(Guid expenseId);
        Task<Expense> UpdateExpenseAsync(UpdateExpenseViewModel expense);
    }
}