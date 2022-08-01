using System;

namespace API.DTOs
{
    public class ExpenseDisplayDto
    {
        public int Id { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double Amount { get; set; }
        public AssetDto Asset { get; set; }
        public int AssetId { get; set; }
    }
}
