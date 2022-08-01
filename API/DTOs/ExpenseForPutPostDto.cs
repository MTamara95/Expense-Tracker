using System;

namespace API.DTOs
{
    public class ExpenseForPutPostDto
    {
        public DateTime PurchaseDate { get; set; }
        public double Amount { get; set; }
        public int AssetId { get; set; }
        public int AppUserId { get; set; }
    }
}
