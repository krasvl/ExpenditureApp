using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ExpenditureApp.Services.EmailValidator
{
    public class EmailValidator : IEmailValidator
    {
        public List<string> ValidateEmail(string email) =>
            new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").IsMatch(email) ?
            new List<string>() : new List<string>() { { "Некорректный Email" } };
    }
}
