using System.Threading.Tasks;
using LoveNotes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using LoveNotes.Utils;
using System;

namespace lovenotes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        readonly protected string JWT_KEY;
        public SessionsController(DatabaseContext context, IConfiguration Config)
        {
            _context = context;
            JWT_KEY = Config["JWT_KEY"];

        }

        public class LoginUser
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginUser loginUser)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(User => User.UserName == loginUser.UserName);
            if (foundUser != null && foundUser.IsValidPassword(loginUser.Password))
            {

                var response = new
                {

                    token = new TokenGenerator(JWT_KEY).TokenFor(foundUser),

                    user = foundUser
                };
                return Ok(response);
            }
            else
            {

                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "User does not exist" }
                };

                return BadRequest(response);
            }

        }

    }



}