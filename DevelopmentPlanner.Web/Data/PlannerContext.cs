using DevelopmentPlanner.Web.Data.Configuration;
using DevelopmentPlanner.Web.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevelopmentPlanner.Web.Data
{
    public class PlannerContext : DbContext
    {
        public PlannerContext() : base("PlannerContext")
        {
            Database.Log = msg => Debug.WriteLine(msg);
            Database.SetInitializer<PlannerContext>(null);
        }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new TicketConfiguration());
        }
    }

}
