using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.ViewModels
{
    public class CreateExpenseViewModel
    {
        public string Name { get; set; }
        public double Cost { get; set; }
        public DateTime DateTime { get; set; }
        public Guid ExpenseTypeId { get; set; }
    }
}
