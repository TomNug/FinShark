using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Stocks")]
    public class Stock
    {
        
        public int Id { get; set; }
        // string.Empties are preventing null reference errors
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        [Column(TypeName="decimal(18.2)")] // DataAnnotation
        public decimal Purchase { get; set; }
        [Column(TypeName="decimal(18.2)")] // DataAnnotation
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }

        // A stock has many comments
        public List<Comment> Comments {get; set; } = new List<Comment>();
        public List<Portfolio> Portfolios {get; set;} = new List<Portfolio>();
    }
}