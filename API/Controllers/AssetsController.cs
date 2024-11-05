using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    // [Authorize] - commented out for eaiser testing
    public class AssetsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private IAssetRepository _assetRepo;
        private readonly IAmazonS3 _s3Client;

        public AssetsController(IAssetRepository assetRepo, IMapper mapper)
        {
            _assetRepo = assetRepo;
            _mapper = mapper;
            _s3Client = new AmazonS3Client("testKey1", "testkey2", RegionEndpoint.EUCentral1);
        }

        [HttpGet("getSignedUrl")]
        public async Task<ActionResult<string>> GetSignedUrl(string bucketName, string objectKey)
        {
            try
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = objectKey,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddMinutes(5) // URL will expire in 5 minutes
                };

                string url = await _s3Client.GetPreSignedURLAsync(request);
                return Ok(JsonConvert.SerializeObject(url));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error generating signed URL: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAssets()
        {
            var assets = await _assetRepo.GetAllAssets();
            return Ok(assets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var result = await _assetRepo.GetAsset(id);
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAsset(AssetDto asset)
        {
            if (asset == null)
            {
                return BadRequest();
            }

            var assetByCodeName = await _assetRepo.GetAssetByCodeName(asset.CodeName);
            if (assetByCodeName != null)
            {
                ModelState.AddModelError("codeName", "Asset already exists");
                // investigate implementing custom validation for unique entities
                return BadRequest(ModelState);
            }

            var mappedAsset = _mapper.Map<Asset>(asset);
            var createdAsset = await _assetRepo.AddAsset(mappedAsset);

            return CreatedAtAction(nameof(GetAsset), new { id = createdAsset.Id }, createdAsset);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Asset>> UpdateAsset(int id, AssetDto asset)
        {
           var assetToUpdate = await _assetRepo.GetAsset(id);
            if (assetToUpdate == null)
            {
                return NotFound($"Asset with Id = {id} not found");
            }

            var mappedAsset = _mapper.Map<Asset>(asset);
            return await _assetRepo.UpdateAsset(id, mappedAsset);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Asset>> DeleteAsset(int id)
        {
            var assetToDelete = await _assetRepo.GetAsset(id);
            if (assetToDelete == null)
            {
                return NotFound($"Asset with Id = {id} not found");
            }

            return await _assetRepo.DeleteAsset(id);
        }
    }
}
