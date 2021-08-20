using ExpenditureApp.Models;
using System.Threading.Tasks;

namespace ExpenditureApp.DbServices.UserRepository
{
    public interface IUserRepository
    {
        Task<User> CreateUserAsync(string login, string passwordHash, string firstName, string lastName);
        Task<User> GetUserByLoginAsync(string login);
    }
}