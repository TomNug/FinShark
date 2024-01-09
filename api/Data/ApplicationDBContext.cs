using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        // Base passes the given parameter to the base class
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        // Manipulating the whole table. 
        // Creates database for us 
        public DbSet<Stock> Stock {get; set;}
        public DbSet<Comment> Comments {get; set;}
        

    }
}