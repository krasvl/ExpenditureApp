using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ExpenditureApp.Services.PasswordValidator
{
    public class PasswordValidator : IPasswordValidator
    {
        public List<string> ValidatePassword(string password)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimumChars = new Regex(@".{6,}");

            var result = new List<string>();

            if (!hasNumber.IsMatch(password))
                result.Add("В пароле должны присутствовать числа");
            if (!hasUpperChar.IsMatch(password))
                result.Add("В пароле должны присутствовать заглавные буквы");
            if (!hasMinimumChars.IsMatch(password))
                result.Add("Минимальная длина пароля 6 символов");

            return result;
        }
    }
}
