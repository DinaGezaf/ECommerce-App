using ECommerce.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerce.API.Controllers
{
    [Route("api/Products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProductController(IProductService productService,UserManager<ApplicationUser> userManager)
        {
            _productService = productService;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(Policy = "AdminAndUsers")]
        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            return await _productService.GetAllProductsAsync();
        }

        [HttpGet("details")]
        [Authorize(Policy = "AdminAndUsers")]
        public async Task<ActionResult<ProductDto>> GetProductDetailsAsync([FromQuery]string ProductCode)
        {
            var Product = await _productService.GetProductDetailsAsync(ProductCode);
            if (Product == null)
            {
                return NotFound();
            }

            return Product;
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> CreateProductAsync([FromBody] ProductAddDto ProductDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var validationResults = await _productService.CreateProductAsync(ProductDto,userId);
            if (validationResults?.Count == 0)
            {
                return Ok("Product created successfully.");
            }
            return BadRequest(validationResults);
        }

        [HttpPut("edit")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateProductAsync( string ProductCode, ProductUpdateDto ProductDto)
        {
            var user = await _userManager.GetUserAsync(User);
            var userId = user.Id;

            var validationResults = await _productService.UpdateProductAsync(ProductCode, ProductDto,userId);
            if (validationResults?.Count == 0)
            {
                return Ok("Product updated successfully.");
            }
            return BadRequest(validationResults);
        }

        [HttpDelete("delete")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteProductAsync([FromQuery] string ProductCode)
        {
            var user = await _userManager.GetUserAsync(User);
            var userId = user.Id;

            var deleted = await _productService.DeleteProductAsync(ProductCode, userId);
            if (deleted)
            {
                return Ok("Product deleted successfully.");
            }
            return NotFound();
        }

        

    }
}
