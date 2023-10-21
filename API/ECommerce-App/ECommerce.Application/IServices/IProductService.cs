using System.ComponentModel.DataAnnotations;


  public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDto> GetProductDetailsAsync(string ProductCode);
    Task<List<ValidationResult>?> CreateProductAsync(ProductAddDto ProductDto, string userId);
    Task<List<ValidationResult>?> UpdateProductAsync(string ProductCode, ProductUpdateDto ProductDto, string userId);
    Task<bool> DeleteProductAsync(string ProductCode, string userId);
    Task<IEnumerable<ProductDto>> GetProductsByUserIdAsync(string userId);

}

