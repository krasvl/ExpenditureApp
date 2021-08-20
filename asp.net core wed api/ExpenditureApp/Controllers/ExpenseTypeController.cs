using ExpenditureApp.DbServices.ExpenseTypeRepository;
using ExpenditureApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseTypeController : ControllerBase
    {
        private readonly IExpenseTypeRepository _expenseTypeRepository;
        public ExpenseTypeController(IExpenseTypeRepository expenseTypeRepository)
        {
            _expenseTypeRepository = expenseTypeRepository;
        }

        [HttpGet]
        public async Task<List<ExpenseType>> Get()
        {
            return await _expenseTypeRepository.GetExpenseTypesAsync();
        }

        
    }
}
