using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
{
    public class AssetRepository : IAssetRepository
    {
        private readonly DataContext _context;

        public AssetRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Asset> AddAsset(Asset asset)
        {
            var result = await _context.Assets.AddAsync(asset);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Asset> DeleteAsset(int assetId)
        {
            var result = await _context.Assets
                .FirstOrDefaultAsync(x => x.Id == assetId);
            if (result != null)
            {
                _context.Assets.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<IEnumerable<Asset>> GetAllAssets()
        {
            return await _context.Assets.ToListAsync();
        }

        public async Task<Asset> GetAsset(int assetId)
        {
            return await _context.Assets.FindAsync(assetId);
        }

        public async Task<Asset> GetAssetByCodeName(string codeName)
        {
            return await _context.Assets.FirstOrDefaultAsync(x => x.CodeName == codeName);
        }

        public async Task<Asset> UpdateAsset(int assetId, Asset asset)
        {
            var result = await _context.Assets.
                FirstOrDefaultAsync(x => x.Id == assetId);

            if (result != null)
            {
                result.Name = asset.Name;
                result.CodeName = asset.CodeName;

                await _context.SaveChangesAsync();
                return result;
            }

            return null;
        }
    }
}
