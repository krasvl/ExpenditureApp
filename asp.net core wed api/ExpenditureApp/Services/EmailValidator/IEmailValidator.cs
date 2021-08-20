using System.Collections.Generic;

namespace ExpenditureApp.Services.EmailValidator
{
    public interface IEmailValidator
    {
        List<string> ValidateEmail(string email);
    }
}