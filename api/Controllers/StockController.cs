using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        // Want DBContext to be immutable
        private readonly ApplicationDBContext _context;
        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }

        // Get is a read, accessing data
        [HttpGet]
        public IActionResult GetAll()
        {
            // NOTE: DEFERRED EXECUTION from _context.Stocks
            // ToList() enforces IMMEDIATE EXECUTION
            // .Select is a map
            var stocks = _context.Stocks.ToList()
            .Select(s => s.ToStockDto());

            return Ok(stocks);
        }

        // Detail endpoint
        // Uses MODEL BINDING to extract string, convert to int, and pass to code
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id);
            if (stock == null){
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }


        [HttpPost]
        // Data will be sent in the form of JSON
        // In the body of the http
        // Not through the URL
        public IActionResult Create([FromBody] CreateStockRequestDto stockDto){
            var stockModel = stockDto.ToStockFromCreateDto();
            _context.Stocks.Add(stockModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new {id = stockModel.Id}, stockModel.ToStockDto());
        }
    }
}