using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tareas.Models;

namespace Tareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly TareasContext _dbcontext;

        public TareaController(TareasContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Tarea> lista = _dbcontext.Tareas
                .OrderByDescending(t => t.IdTarea)
                .ThenBy(t => t.FechaRegistro)
                .ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Tarea request)
        {
            await _dbcontext.Tareas.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created, "ok");
        }

        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            Tarea tarea = _dbcontext.Tareas.Find(id);

            if (tarea == null) return StatusCode(StatusCodes.Status404NotFound);    

            _dbcontext.Tareas.Remove(tarea);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
