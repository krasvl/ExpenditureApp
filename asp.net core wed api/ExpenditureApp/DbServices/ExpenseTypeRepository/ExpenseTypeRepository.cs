using ExpenditureApp.DbServices.AppContext;
using ExpenditureApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.DbServices.ExpenseTypeRepository
{
    public class ExpenseTypeRepository : IExpenseTypeRepository
    {
        private readonly ApplicationContext _context;

        public ExpenseTypeRepository(ApplicationContext context)
        {
            _context = context;
        }

        public void InitExpenseTypes(List<ExpenseType> types)
        {
            _context.AddRange(types);
            _context.SaveChanges();
        }

        public async Task<List<ExpenseType>> GetExpenseTypesAsync() =>
            await _context.ExpenseTypes.ToListAsync();

        public async Task<ExpenseType> GetExpenseTypeByIdAsync(Guid id) =>
            await _context.ExpenseTypes.FirstOrDefaultAsync(e => e.Id == id);
    }
}
