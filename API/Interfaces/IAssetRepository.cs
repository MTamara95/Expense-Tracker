using API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IAssetRepository
    {
        Task<IEnumerable<Asset>> GetAllAssets();
        Task<Asset> GetAsset(int assetId);
        Task<Asset> GetAssetByCodeName(string codeName);
        Task<Asset> AddAsset(Asset asset);
        Task<Asset> UpdateAsset(int id, Asset asset);
        Task<Asset> DeleteAsset(int assetId);
    }
}
