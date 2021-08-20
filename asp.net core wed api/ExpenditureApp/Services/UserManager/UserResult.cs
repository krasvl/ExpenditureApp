using ExpenditureApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.Services.UserManager
{
    public class UserResult
    {
        public bool Successed { get; set; } = false;
        public List<string> EmailValidationErrors { get; set; } = new List<string>();
        public List<string> PasswordValidationErrors { get; set; } = new List<string>();
        public User User { get; set; }
        public string Token { get; set; }
    }
}
