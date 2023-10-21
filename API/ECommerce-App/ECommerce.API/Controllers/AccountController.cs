using AutoMapper;
using ECommerce.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public AccountController(IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            IMapper mapper)
        {
            _configuration = configuration;
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpPost]
        [Route("RegisterAdmin")]
        public async Task<ActionResult<UserDto>> RegisterAdmin(UserDto registerDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, "Admin"),
        };
            await _userManager.AddClaimsAsync(user, claims);

            return Ok("Admin Registered Successfully");
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<ActionResult<UserDto>> RegisterUser(UserDto registerDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, "User"),
        };
            await _userManager.AddClaimsAsync(user, claims);

            return Ok("User Registered Successfully");
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<TokenDto>> Login(LoginDto credentials)
        {
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            if (user != null)
            {
                if (!await _userManager.CheckPasswordAsync(user, credentials.Password))
                    return Unauthorized();

                user.LastLoginTime = DateTime.Now;
                await _userManager.UpdateAsync(user);
            }
            else
                return Unauthorized();

            var claimsList = await _userManager.GetClaimsAsync(user);
            var roles = claimsList.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            var role = roles.FirstOrDefault();

            foreach (var r in roles)
            {
                claimsList.Add(new Claim(ClaimTypes.Role, r));
            }

            var secretKeyString = _configuration.GetValue<string>("SecretKey");
            var secretyKeyInBytes = Encoding.ASCII.GetBytes(secretKeyString ?? string.Empty);
            var secretKey = new SymmetricSecurityKey(secretyKeyInBytes);

            var signingCredentials = new SigningCredentials(secretKey,
                SecurityAlgorithms.HmacSha256Signature);

            var expiryDate = DateTime.Now.AddDays(5);
            var token = new JwtSecurityToken(
                claims: claimsList,
                expires: expiryDate,
                signingCredentials: signingCredentials);


            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenString =  tokenHandler.WriteToken(token);

            return new TokenDto
            {
                Token = tokenString,
                ExpiryDate = expiryDate,
                Role = role

            };
        }
        [HttpPost]
        [Route("refresh")]
        public async Task<ActionResult<TokenDto>> Refresh(TokenDto tokenDto)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("SecretKey"));
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _configuration.GetValue<string>("Issuer"),
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false 
            };

            SecurityToken validatedToken;
            var principal = tokenHandler.ValidateToken(tokenDto.Token, validationParameters, out validatedToken);
            if (validatedToken.ValidTo > DateTime.UtcNow.AddMinutes(5)) // Check if the token is close to expiring
            {
                return new TokenDto
                {
                    Token = tokenDto.Token,
                    ExpiryDate = validatedToken.ValidTo,
                };
            }

            var username = principal.Identity.Name;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration.GetValue<string>("Issuer")
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            var newToken = tokenHandler.WriteToken(token);

            return new TokenDto
            {
                Token = newToken,
                ExpiryDate = DateTime.UtcNow.AddHours(1) 
            };
        }

    }
}
