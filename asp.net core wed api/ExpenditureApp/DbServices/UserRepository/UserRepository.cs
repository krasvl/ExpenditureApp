using ExpenditureApp.DbServices.AppContext;
using ExpenditureApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.DbServices.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContext _context;
        public UserRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByLoginAsync(string login) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Login == login);

        public async Task<User> CreateUserAsync(string login, string passwordHash, string firstName, string lastName)
        {
            var user = await _context.Users.AddAsync(new User { Login = login, PasswordHash = passwordHash, FirstName = firstName, LastName = lastName });
            await _context.SaveChangesAsync();
            return user.Entity;
        }
    }
}
