using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExpenditureApp.Models
{
    public class Expense
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public DateTime DateTime { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        public Guid UserId { get; set; }


        public ExpenseType ExpenseType { get; set; }
        public Guid ExpenseTypeId { get; set; }
    }
}
