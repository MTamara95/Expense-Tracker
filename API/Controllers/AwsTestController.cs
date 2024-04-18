using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Controllers
{
    public class AwsTestController : BaseApiController
    {
        private readonly string _accessKeyId;
        private readonly string _secretAccessKey;

        public AwsTestController(IConfiguration config)
        {
            _accessKeyId = config["AwsAccessKeyId"];
            _secretAccessKey = config["AwsSecretAccessKey"];
        }

        [HttpPost("uploadtos3")]
        public async Task<ActionResult<int>> UploadToS3()
        {
            var region = RegionEndpoint.EUCentral1;

            var bucketName = "marceticm.click";

            var filePath = "C:\\Documents backup\\HelloS3.txt";

            var s3Client = new AmazonS3Client(_accessKeyId, _secretAccessKey, region);

            var transferUtility = new TransferUtility(s3Client);

            await transferUtility.UploadAsync(filePath, bucketName);

            return StatusCodes.Status201Created;
        }
    }
}
