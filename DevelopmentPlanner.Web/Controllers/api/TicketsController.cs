using DevelopmentPlanner.Web.Data;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;

namespace DevelopmentPlanner.Web.Controllers.api
{
    public class TicketsController : ApiController
    {
        private PlannerContext context;

        public TicketsController()
        {
            context = new PlannerContext();
        }

        public async Task<object> Get()
        {
            var list = await context.Tickets.ToListAsync();
            return Ok(list);
        }
    }
}
