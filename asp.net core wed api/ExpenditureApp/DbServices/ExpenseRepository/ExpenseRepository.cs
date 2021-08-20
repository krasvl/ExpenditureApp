using ExpenditureApp.DbServices.AppContext;
using ExpenditureApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ExpenditureApp.ViewModels;

namespace ExpenditureApp.DbServices.ExpenseRepository
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationContext _context;

        public ExpenseRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<StatisticsViewModel> GetStatisticsAsync(string userLogin, DateTime startDate, DateTime endDate)
        {
            var minDate = await _context.Expenses.Include(e => e.User).Where(e => e.User.Login == userLogin).MinAsync(e => e.DateTime);
            var maxDate = await _context.Expenses.Include(e => e.User).Where(e => e.User.Login == userLogin).MaxAsync(e => e.DateTime);

            var countMonths = ((maxDate.Year - minDate.Year) * 12) + maxDate.Month - minDate.Month + 1;

            var model = new StatisticsViewModel();

            model.AverageMonthlyExpenses = await _context.Expenses.Include(e => e.User)
                .Where(e => e.User.Login == userLogin).SumAsync(e => e.Cost) / countMonths;

            model.TotalExpensesForTheMonth = await _context.Expenses.Include(e => e.User)
                .Where(e => e.User.Login == userLogin && e.DateTime > startDate && e.DateTime < endDate).SumAsync(e => e.Cost);

            model.StatisticsOnAverangeForTheMonth = await _context.Expenses.Include(e => e.User).Include(e => e.ExpenseType)
                .Where(e => e.User.Login == userLogin)
                .GroupBy(e => e.ExpenseType.Name, e => e.Cost, (key, val) => new { Key = key, Val = val.Sum() / countMonths })
                .ToDictionaryAsync(e => e.Key, e => e.Val);

            model.StatisticsForTheMonth = await _context.Expenses.Include(e => e.User).Include(e => e.ExpenseType)
                .Where(e => e.User.Login == userLogin && e.DateTime > startDate && e.DateTime < endDate)
                .GroupBy(e => e.ExpenseType.Name, e => e.Cost, (key, val) => new { Key = key, Val = val.Sum() })
                .ToDictionaryAsync(e => e.Key, e => e.Val);

            return model;
        }

        public async Task<List<Expense>> GetUsersExpensesAsync(string userLogin) =>
            await _context.Expenses.Include(e => e.User).Include(e => e.ExpenseType).Where(e => e.User.Login == userLogin).ToListAsync();

        public async Task<List<Expense>> GetUsersExpensesAsync(string userLogin, DateTime? startDate = null, DateTime? endDate = null, string name = null, double? minCost = null, double? maxCost = null, Guid? expenseTypeId = null) =>
            await _context.Expenses.Include(e => e.User).Include(e => e.ExpenseType)
            .Where(e => e.User.Login == userLogin &&
            (startDate != null ? e.DateTime > startDate : true) &&
            (endDate != null ? e.DateTime < endDate : true) &&
            (name != null ? EF.Functions.Like(e.Name.ToLower(), $"%{name.ToLower()}%") : true) &&
            (minCost != null ? e.Cost >= minCost : true) &&
            (maxCost != null ? e.Cost <= maxCost : true) &&
            (expenseTypeId != null ? e.ExpenseTypeId == expenseTypeId : true))
            .ToListAsync();

        public async Task<Expense> AddExpenseAsync(string userLogin, CreateExpenseViewModel expenseViewModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Login == userLogin);

            var expense = _context.Expenses.Add(new Expense()
            {
                Name = expenseViewModel.Name,
                DateTime = expenseViewModel.DateTime,
                Cost = expenseViewModel.Cost,
                ExpenseType = await _context.ExpenseTypes.FirstOrDefaultAsync(e => e.Id == expenseViewModel.ExpenseTypeId),
                ExpenseTypeId = expenseViewModel.ExpenseTypeId,
                UserId = user.Id
            });

            await _context.SaveChangesAsync();
            return expense.Entity;
        }

        public async Task<Expense> UpdateExpenseAsync(UpdateExpenseViewModel expenseViewModel)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == expenseViewModel.Id);
            expense.Name = expenseViewModel.Name;
            expense.ExpenseTypeId = expenseViewModel.ExpenseTypeId;
            expense.ExpenseType = await _context.ExpenseTypes.FirstOrDefaultAsync(e => e.Id == expenseViewModel.ExpenseTypeId);
            expense.Cost = expenseViewModel.Cost;
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<Expense> RemoveExpenseAsync(Guid expenseId)
        {
            var result = _context.Expenses.Remove(await _context.Expenses.FirstOrDefaultAsync(e => e.Id == expenseId));
            await _context.SaveChangesAsync();
            return result.Entity;
        }
    }
}
