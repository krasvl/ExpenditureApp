using ExpenditureApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExpenditureApp.DbServices.ExpenseTypeRepository
{
    public interface IExpenseTypeRepository
    {
        void InitExpenseTypes(List<ExpenseType> types);
        Task<List<ExpenseType>> GetExpenseTypesAsync();
        Task<ExpenseType> GetExpenseTypeByIdAsync(Guid id);
    }
}