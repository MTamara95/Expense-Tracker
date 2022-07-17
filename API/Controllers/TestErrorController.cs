using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TestErrorController : BaseApiController
    {
        private readonly DataContext _context;

        public TestErrorController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var test = _context.Users.Find(-1);

            if (test == null) return NotFound();

            return Ok(test);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var test = _context.Users.Find(-1);

            var toReturn = test.ToString();

            return toReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }
    }
}
