using ExpenditureApp.DbServices.UserRepository;
using System.Threading.Tasks;

namespace ExpenditureApp.Services.UserManager
{
    public interface IUserManager
    {
        Task<UserResult> Login(string login, string password);
        Task<UserResult> Register(string login, string password, string firstName, string lastName);
    }
}