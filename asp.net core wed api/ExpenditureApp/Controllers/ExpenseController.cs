using ExpenditureApp.DbServices.ExpenseRepository;
using ExpenditureApp.Models;
using ExpenditureApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepository;
        public ExpenseController(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        [HttpGet("Statistics")]
        public async Task<StatisticsViewModel> GetStatistics(DateTime startDate, DateTime endDate) =>
            await _expenseRepository.GetStatisticsAsync(User.Identity.Name, startDate, endDate);


        [HttpGet]
        public async Task<List<Expense>> Get(DateTime? startDate = null, DateTime? endDate = null, string name = null, double? minCost = null, double? maxCost = null, Guid? expenseTypeId = null) => 
            await _expenseRepository.GetUsersExpensesAsync(User.Identity.Name, startDate, endDate, name, minCost, maxCost, expenseTypeId);

        [HttpPost]
        public async Task<Expense> Post(CreateExpenseViewModel expenseViewModel) =>
             await _expenseRepository.AddExpenseAsync(User.Identity.Name, expenseViewModel);

        [HttpPut]
        public async Task<Expense> Put(UpdateExpenseViewModel expense) =>
            await _expenseRepository.UpdateExpenseAsync(expense);


        [HttpDelete]
        public async Task<Expense> Delete(Guid expenseId) =>
            await _expenseRepository.RemoveExpenseAsync(expenseId);

    }
}
