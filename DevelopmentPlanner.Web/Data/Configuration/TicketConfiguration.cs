using DevelopmentPlanner.Web.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevelopmentPlanner.Web.Data.Configuration
{
    public class TicketConfiguration: EntityTypeConfiguration<Ticket>
    {
        public TicketConfiguration()
        {
            ToTable("dbo.v_Tickets");
        }
    }
}
