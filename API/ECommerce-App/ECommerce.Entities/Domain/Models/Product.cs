using System.ComponentModel.DataAnnotations;

namespace ECommerce.Entities;

public class Product
{
    // Properties
    [Key]
    public string ProductCode { get; set; }
    public int ProductNo { get; set; }
    public string Category { get; set; }
    public string Name { get; set; }
    public string ImagePath { get; set; } 
    public decimal Price { get; set; }
    public int MinimumQuantity { get; set; }
    public double DiscountRate { get; set; }
    public ApplicationUser User { get; set; }
}
