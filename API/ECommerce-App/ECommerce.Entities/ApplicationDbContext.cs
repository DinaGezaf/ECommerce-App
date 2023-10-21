using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace ECommerce.Entities;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Product> Products { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ApplicationUser>()
       .HasIndex(u => u.UserName)
        .IsUnique();

        builder.Entity<ApplicationUser>()
            .HasIndex(u => u.Email)
            .IsUnique();
        builder.Entity<Product>()
            .HasIndex(p => p.ProductCode)
            .IsUnique();
    }
}