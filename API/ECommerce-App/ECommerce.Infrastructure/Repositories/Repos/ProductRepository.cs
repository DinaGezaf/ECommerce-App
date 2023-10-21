using ECommerce.Entities;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.Infrastructure;
public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }
    public async Task<int> GetMaxProductNo()
    {
        var maxProductNo = await _context.Products.MaxAsync(product => (int?)product.ProductNo);
        return maxProductNo.HasValue ? maxProductNo.Value : 0;
    }


    public async Task<Product> GetProductDetailsAsync(string ProductCode)
    {
        return await _context.Products.FirstOrDefaultAsync(Product => Product.ProductCode == ProductCode);
    }

    public async Task<IEnumerable<Product>> GetProductsByUserIdAsync(string userId)
    {
        return await _context.Products.Where(Product => Product.User.Id == userId).ToListAsync();
    }

    public async Task AddProductAsync(Product Product)
    {
        _context.Products.Add(Product);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProductAsync(Product Product)
    {
        _context.Products.Update(Product);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProductAsync(string ProductCode)
    {
        var Product = await _context.Products.FirstOrDefaultAsync(Product => Product.ProductCode == ProductCode);
        if (Product != null)
        {
            _context.Products.Remove(Product);
            await _context.SaveChangesAsync();
        }
    }
    public async Task<ApplicationUser> GetUserByIdAsync(string userId)
    {
        return await _context.Users.FindAsync(userId);
    }
    public IQueryable<Product> GetProductsPaginated()
    {
         return  _context.Set<Product>().AsQueryable();
    }
}

