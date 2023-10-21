
public class ProductDto
{
    public string ProductCode { get; set; }
    public string Category { get; set; }
    public string Name { get; set; }
    public string ImagePath { get; set; }
    public decimal Price { get; set; }
    public int MinimumQuantity { get; set; }
    public double DiscountRate { get; set; }
   
}
public class ProductUpdateDto
{
    public string Category { get; set; }
    public string Name { get; set; }
    public string ImagePath { get; set; }
    public decimal Price { get; set; }
    public int MinimumQuantity { get; set; }
    public double DiscountRate { get; set; }

}

public class ProductAddDto
{
    public string Category { get; set; }
    public string Name { get; set; }
    public string ImagePath { get; set; }
    public decimal Price { get; set; }
    public int MinimumQuantity { get; set; }
    public double DiscountRate { get; set; }

}

