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

        // FromRoute will have ID in the URL
        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto){
            var stockModel = _context.Stocks.FirstOrDefault(x => x.Id == id);

            // Once retrieved, Entity starts tracking it
            if (stockModel == null){
                return NotFound();
            }

            // Take what's been given to the API 
            // Turn it into the appropriate object
            stockModel.Symbol = updateDto.Symbol;
            stockModel.CompanyName = updateDto.CompanyName;
            stockModel.Purchase = updateDto.Purchase;
            stockModel.LastDiv = updateDto.LastDiv;
            stockModel.Industry = updateDto.Industry;
            stockModel.MarketCap = updateDto.MarketCap;

            // Actually send to the database
            _context.SaveChanges();

            return Ok(stockModel.ToStockDto());
        }
    }
}