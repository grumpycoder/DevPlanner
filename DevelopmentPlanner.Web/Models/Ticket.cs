using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevelopmentPlanner.Web.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int TicketNumber { get; set; }
        public int ParentTicketNumber { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime StartDate { get; set; }

    }
}
