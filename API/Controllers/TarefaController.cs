using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _context;

    public TarefaController(AppDataContext context) =>
        _context = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _context.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Categoria = categoria;
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id)
    {
        try
        {
            Tarefa? tarefaEncontrada = _context.Tarefas.FirstOrDefault(x => x.TarefaId == id);

            if (tarefaEncontrada != null)
            {
                if (tarefaEncontrada.Status == "Não iniciada")
                {
                    tarefaEncontrada.Status = "Em andamento";
                }
                else
                {
                    tarefaEncontrada.Status = "Concluída";
                }

                // tarefaEncontrada.Status == "Não iniciada" ? tarefaEncontrada.Status = "Em andamento" : tarefaEncontrada.Status = "Concluída";


                _context.Tarefas.Update(tarefaEncontrada);
                _context.SaveChanges();
                return Ok(tarefaEncontrada);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("naoconcluidas")]
    public IActionResult ListarNaoConcluidas()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            List<Tarefa> tarefasNaoConcluidas = new();

            foreach (var tarefa in tarefas)
            {
                if (tarefa.Status.Equals("Não iniciada") || tarefa.Status.Equals("Em andamento"))
                {
                    System.Console.WriteLine("teste tarefa: ", tarefa);
                    tarefasNaoConcluidas.Add(tarefa);
                }
            }
            return tarefasNaoConcluidas.Count == 0 ? NoContent() : Ok(tarefasNaoConcluidas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("concluidas")]
    public IActionResult ListarConcluidas()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();

            List<Tarefa> tarefasConcluidas = new();

            foreach (var tarefa in tarefas)
            {
                if (tarefa.Status.Equals("Concluída"))
                {
                    System.Console.WriteLine("teste tarefa concluidas: ", tarefa);
                    tarefasConcluidas.Add(tarefa);
                }
            }
            return tarefasConcluidas.Count == 0 ? NoContent() : Ok(tarefasConcluidas);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
