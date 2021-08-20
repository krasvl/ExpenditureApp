using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExpenditureApp.Models
{
    public class ExpenseType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public List<Expense> Expenses { get; set; }
    }
}
