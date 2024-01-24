using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Portfolios")]
    public class Portfolio
    {
        // FKs to link tables
        public string AppUserId { get; set; }
        public int StockId { get; set; }    

        // Navigation properties
        public AppUser AppUser { get; set; }
        public Stock Stock { get; set; }
    }
}