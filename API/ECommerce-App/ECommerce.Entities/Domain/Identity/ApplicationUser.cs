using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Entities;

public class ApplicationUser:IdentityUser
{
    public DateTime LastLoginTime { get; set; }
}