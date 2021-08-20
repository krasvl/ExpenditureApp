using System.Collections.Generic;

namespace ExpenditureApp.Services.PasswordValidator
{
    public interface IPasswordValidator
    {
        List<string> ValidatePassword(string password);
    }
}