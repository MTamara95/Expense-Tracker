using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AssetDto, Asset>();
            CreateMap<Asset, AssetDto>();

            CreateMap<ExpenseForPutPostDto, Expense>();
            CreateMap<Expense, ExpenseDisplayDto>();
        }
    }
}
