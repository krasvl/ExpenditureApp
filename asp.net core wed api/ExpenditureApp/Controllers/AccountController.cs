using ExpenditureApp.Models;
using ExpenditureApp.Services.UserManager;
using ExpenditureApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenditureApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserManager _userManager;

        public AccountController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<UserResult>> Get(string login, string password)
        {
            var result = await _userManager.Login(login, password);
            if (result.Successed)
                return Ok(result);
            else
                return Unauthorized(result);
        }

        [HttpPost]
        public async Task<ActionResult<UserResult>> Post(UserViewModel userViewModel)
        {
            var result = await _userManager.Register(userViewModel.Login, userViewModel.Password, userViewModel.FirstName, userViewModel.LastName);
            if (result.Successed)
                return Ok(result);
            else
                return Unauthorized(result);
        }

    }
}
