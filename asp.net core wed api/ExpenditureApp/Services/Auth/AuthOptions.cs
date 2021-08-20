using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenditureApp.Services.Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "ExpenditureAppServer";
        public const string AUDIENCE = "ExpenditureAppClient";
        const string KEY = "ExpenditureApp123";
        public const int LIFETIME = 10080;
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        
    }
}
