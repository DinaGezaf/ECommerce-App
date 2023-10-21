using AutoMapper;
using ECommerce.Entities;
using ECommerce.Infrastructure;
using System.ComponentModel.DataAnnotations;
namespace ECommerce.Application;

public class ProductService: IProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        await _unitOfWork.BeginTransactionAsync();
        var products = await _unitOfWork.ProductRepository.GetAllProductsAsync();

        List<ProductDto> dtos = new List<ProductDto>();
        foreach (Product product in products)
        {
            dtos.Add(_mapper.Map<ProductDto>(product));
        }
        await _unitOfWork.CommitAsync();
        return dtos;
    }

    public async Task<ProductDto> GetProductDetailsAsync(string ProductCode)
    {
        await _unitOfWork.BeginTransactionAsync();
        var product= await _unitOfWork.ProductRepository.GetProductDetailsAsync(ProductCode);
        if (product == null)
        {
            return null;
        }
        await _unitOfWork.CommitAsync();
        return _mapper.Map<ProductDto>(product);
    }

    public async Task<List<ValidationResult>?> CreateProductAsync(ProductAddDto productDto, string userId)
    {
        
        var Product = _mapper.Map<Product>(productDto);
        var user = await _unitOfWork.ProductRepository.GetUserByIdAsync(userId);
        Product.User = user;
        Product.ProductNo = (await _unitOfWork.ProductRepository.GetMaxProductNo()) + 1;
        Product.ProductCode = "P0" + Product.ProductNo;
        List<ValidationResult>? validationResults = ValidateModel.ModelValidation(Product);
        if (validationResults?.Count == 0)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                await _unitOfWork.ProductRepository.AddProductAsync(Product);
                await _unitOfWork.SaveAsync();
                await _unitOfWork.CommitAsync(); 
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackAsync();
            }
            finally
            {
                _unitOfWork.Dispose();
            }
        }

        return validationResults;
    }

    public async Task<List<ValidationResult>?> UpdateProductAsync(string ProductCode, ProductUpdateDto ProductDto, string userId)
    {
        await _unitOfWork.BeginTransactionAsync();
        var user = await _unitOfWork.ProductRepository.GetUserByIdAsync(userId);
        var existingProduct = await _unitOfWork.ProductRepository.GetProductDetailsAsync(ProductCode);

        
        if (existingProduct == null || user == null || existingProduct.User.Id != userId)
            return null;

        _mapper.Map(ProductDto, existingProduct);
        List<ValidationResult>? validationResults = ValidateModel.ModelValidation(existingProduct);

        if (validationResults?.Count == 0)
        {
            try
            {
                await _unitOfWork.SaveAsync(); 
                await _unitOfWork.CommitAsync();
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackAsync();
            }
            finally
            {
                _unitOfWork.Dispose();
            }
        }

        return validationResults;
    }

    public async Task<bool> DeleteProductAsync(string ProductCode, string userId)
    {
        await _unitOfWork.BeginTransactionAsync();
        var user = await _unitOfWork.ProductRepository.GetUserByIdAsync(userId);
        var Product = await _unitOfWork.ProductRepository.GetProductDetailsAsync(ProductCode);
        if (Product != null && user != null && Product.User.Id == userId)
        {
            try
            {
                await _unitOfWork.ProductRepository.DeleteProductAsync(ProductCode);
                await _unitOfWork.SaveAsync();
                await _unitOfWork.CommitAsync(); 
                return true;
            }
            catch (Exception)
            {
                _unitOfWork.RollbackAsync(); 
            }
            finally
            {
                _unitOfWork.Dispose();
            }
        }

        return false;
    }

    public async Task<IEnumerable<ProductDto>> GetProductsByUserIdAsync(string userId)
    {
        await _unitOfWork.BeginTransactionAsync();
        var Products = await _unitOfWork.ProductRepository.GetProductsByUserIdAsync(userId);
        await _unitOfWork.CommitAsync();
        return _mapper.Map<IEnumerable<ProductDto>>(Products);
    }

   

}
