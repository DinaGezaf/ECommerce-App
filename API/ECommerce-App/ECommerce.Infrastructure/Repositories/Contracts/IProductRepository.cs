using ECommerce.Entities;

namespace ECommerce.Infrastructure;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllProductsAsync();
    Task<Product> GetProductDetailsAsync(string ProductCode);
    Task<ApplicationUser> GetUserByIdAsync(string userId);
    Task<IEnumerable<Product>> GetProductsByUserIdAsync(string userId);
    IQueryable<Product> GetProductsPaginated();
    Task AddProductAsync(Product product);
    Task UpdateProductAsync(Product product);
    Task DeleteProductAsync(string ProductCode);
    Task<int> GetMaxProductNo();
}
