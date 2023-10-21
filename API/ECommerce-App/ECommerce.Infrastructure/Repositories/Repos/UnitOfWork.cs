using ECommerce.Entities;
using Microsoft.EntityFrameworkCore.Storage;
namespace ECommerce.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IDbContextTransaction _transaction;
    public IProductRepository ProductRepository { get; }

    public UnitOfWork(ApplicationDbContext context, IProductRepository productRepository)
    {
        _context = context;
        ProductRepository = productRepository;
    }


    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        await _transaction?.CommitAsync();
    }

    public async Task RollbackAsync()
    {
       await _transaction?.RollbackAsync();
    }

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _transaction?.DisposeAsync();
        _context.DisposeAsync();
    }
}

