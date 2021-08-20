using ExpenditureApp.DbServices.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenditureApp.Services.PasswordHasher;
using ExpenditureApp.Services.PasswordValidator;
using ExpenditureApp.Services.EmailValidator;
using System.Security.Claims;
using ExpenditureApp.Models;
using System.IdentityModel.Tokens.Jwt;
using ExpenditureApp.Services.Auth;
using Microsoft.IdentityModel.Tokens;

namespace ExpenditureApp.Services.UserManager
{
    public class UserManager : IUserManager
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPasswordValidator _passwordValidator;
        private readonly IEmailValidator _emailValidator;

        public UserManager(IUserRepository userRepository, IPasswordHasher passwordHasher, IPasswordValidator passwordValidator, IEmailValidator emailValidator)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _passwordValidator = passwordValidator;
            _emailValidator = emailValidator;
        }

        public async Task<UserResult> Register(string login, string password, string firstName, string lastName)
        {
            var result = new UserResult();

            var user = await _userRepository.GetUserByLoginAsync(login);

            if (user != null)
            {
                result.EmailValidationErrors.Add("Данный email уже занят");
            }
            else
            {
                result.PasswordValidationErrors = _passwordValidator.ValidatePassword(password); 
                result.EmailValidationErrors = _emailValidator.ValidateEmail(login); 

                if (result.PasswordValidationErrors.Count == 0 && result.EmailValidationErrors.Count == 0)
                {
                    var passwordHash = _passwordHasher.HashPassword(password);
                    var createdUser = await _userRepository.CreateUserAsync(login, passwordHash, firstName, lastName);
                    result.User = createdUser;
                    result.Token = GetToken(createdUser);
                    result.Successed = true;
                }
            }
            return result;
        }

        public async Task<UserResult> Login(string login, string password)
        {
            var result = new UserResult();

            var user = await _userRepository.GetUserByLoginAsync(login);

            if (user == null)
            {
                result.EmailValidationErrors.Add("Пользователя с данным email не существует");
            }
            else if (!_passwordHasher.Veryfy(password, user.PasswordHash))
            {
                result.PasswordValidationErrors.Add("Неверный пароль");
            }
            else
            {
                result.User = user;
                result.Token = GetToken(user);
                result.Successed = true;
            }
            return result;
        }

        private string GetToken(User user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
    }
}
