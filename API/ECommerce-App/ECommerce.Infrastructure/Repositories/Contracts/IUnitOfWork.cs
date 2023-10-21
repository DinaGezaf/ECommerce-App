namespace ECommerce.Infrastructure;
public interface IUnitOfWork : IDisposable
{
     IProductRepository ProductRepository { get; }
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();
    Task<int> SaveAsync();
}
