using AutoMapper;
using ECommerce.Entities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ProductDto,Product>().ReverseMap();
        CreateMap<ProductUpdateDto, Product>().ReverseMap();
        CreateMap<ProductAddDto, Product>().ReverseMap();
    }
}
