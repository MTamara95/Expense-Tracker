using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Expenses")]
    public class Expense
    {
        public int Id { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double Amount { get; set; }
        public Asset Asset { get; set; }
        public int AssetId { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
