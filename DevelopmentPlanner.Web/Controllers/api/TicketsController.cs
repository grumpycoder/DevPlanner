using DevelopmentPlanner.Web.Data;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using System.Data.Entity;
using System.Net.Http;
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

        public async Task<HttpResponseMessage> GetAsync(DataSourceLoadOptions loadOptions)
        {
            //var list = await context.Tickets.ToListAsync();
            return Request.CreateResponse(DataSourceLoader.Load(context.Tickets, loadOptions));
        }

        //public async Task<object> Get()
        //{
        //    var list = await context.Tickets.ToListAsync();
        //    return Ok(list);
        //}
    }
}
