using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.ViewModels
{
    public class UpdateExpenseViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public Guid ExpenseTypeId { get; set; }

    }
}
