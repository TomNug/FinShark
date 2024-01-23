using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        // Want DBContext to be immutable
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepository;
        public StockController(ApplicationDBContext context, IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
            _context = context;
        }

        // Get is a read, accessing data
        // Created query object which could have company name or symbol
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            // Triggers the DataAnnotation validations in the DTO
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // NOTE: DEFERRED EXECUTION from _context.Stocks
            // ToList() enforces IMMEDIATE EXECUTION
            // .Select is a map
            // Pass the QueryObject to the GetAllAsync
            var stocks = await _stockRepository.GetAllAsync(query);

            var stockDto = stocks.Select(s => s.ToStockDto());

            return Ok(stocks);
        }

        // Detail endpoint
        // Uses MODEL BINDING to extract string, convert to int, and pass to code
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            // Triggers the DataAnnotation validations in the DTO
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stock = await _stockRepository.GetByIdAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }


        [HttpPost]
        // Data will be sent in the form of JSON
        // In the body of the http
        // Not through the URL
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            // Triggers the DataAnnotation validations in the DTO
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = stockDto.ToStockFromCreateDto();
            await _stockRepository.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new {id = stockModel.Id}, stockModel.ToStockDto());
        }

        // FromRoute will have ID in the URL
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            // Triggers the DataAnnotation validations in the DTO
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = await _stockRepository.UpdateAsync(id, updateDto);
            // Once retrieved, Entity starts tracking it
            if (stockModel == null)
            {
                return NotFound();
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            // Triggers the DataAnnotation validations in the DTO
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var stockModel = await _stockRepository.DeleteAsync(id);

            if (stockModel == null)
            {
                return NotFound();
            }

            // 204
            return NoContent();
        }
    }
}