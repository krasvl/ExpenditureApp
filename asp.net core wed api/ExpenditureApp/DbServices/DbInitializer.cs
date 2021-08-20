using ExpenditureApp.DbServices.AppContext;
using ExpenditureApp.DbServices.ExpenseRepository;
using ExpenditureApp.DbServices.ExpenseTypeRepository;
using ExpenditureApp.DbServices.UserRepository;
using ExpenditureApp.Models;
using ExpenditureApp.Services.UserManager;
using ExpenditureApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.DbServices
{
    public class DbInitializer
    {
        public static async Task Initialize(IExpenseTypeRepository expenseTypeRepository, IUserManager userManager, IExpenseRepository expenseRepository)
        {
            if((await expenseTypeRepository.GetExpenseTypesAsync()).Count == 0)
            {
                List<ExpenseType> types = new List<ExpenseType>();
                types.Add(new ExpenseType { Name = "Отдых и развлечения" });
                types.Add(new ExpenseType { Name = "Жильё и коммунальные услуги" });
                types.Add(new ExpenseType { Name = "Еда" });
                types.Add(new ExpenseType { Name = "Транспорт" });
                types.Add(new ExpenseType { Name = "Хозяйственные расходы" });
                types.Add(new ExpenseType { Name = "Медицина" });
                types.Add(new ExpenseType { Name = "Одежда и обувь" });
                types.Add(new ExpenseType { Name = "Прочие" });

                expenseTypeRepository.InitExpenseTypes(types);

                await userManager.Register("1@mail.ru", "123456Qw", "Иван", "Иванов");

                foreach (var type in types)
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        await expenseRepository.AddExpenseAsync(
                            "1@mail.ru",
                            new CreateExpenseViewModel
                            {
                                Name = $"Покупка {i} {type.Name}",
                                Cost = new Random().Next(100, 10000),
                                DateTime = new DateTime(
                                2021,
                                new Random().Next(1, 12),
                                new Random().Next(1, 28),
                                new Random().Next(0, 24),
                                new Random().Next(0, 60),
                                new Random().Next(0, 60)
                                ),
                                ExpenseTypeId = type.Id,
                            });
                    }

                    
                }
            }
            
        }
    }
}
