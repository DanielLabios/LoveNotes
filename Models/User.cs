
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace LoveNotes.Models

{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public string HashedPassword { get; set; }
        [Required]
        public string EmailAddress { get; set; }

        public string Password
        {
            set
            {
                this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
            }

        }
        public bool IsValidPassword(string password)
        {
            var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);
            return passwordVerification == PasswordVerificationResult.Success;
        }
    }
}