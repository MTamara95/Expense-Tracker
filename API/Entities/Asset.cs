using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Assets")]
    public class Asset
    {
        public int Id { get; set; }
        public string CodeName { get; set; } // USD, BTC...
        public string Name { get; set; } // Dollar, Bitcoin...
    }
}
