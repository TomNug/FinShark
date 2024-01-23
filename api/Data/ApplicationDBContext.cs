using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        // Base passes the given parameter to the base class
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        // Manipulating the whole table. 
        // Creates database for us 
        public DbSet<Stock> Stocks {get; set;}
        public DbSet<Comment> Comments {get; set;}
        

    }
}