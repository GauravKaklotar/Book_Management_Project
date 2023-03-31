using BookManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksContext _booksContext;

        public BooksController(BooksContext booksContext)
        {
            _booksContext = booksContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Books>>> GetBooks()
        {
            if(_booksContext.Books == null)
            {
                return NotFound();
            }
            return await _booksContext.Books.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Books>> GetBook(int id)
        {
            if (_booksContext.Books == null)
            {
                return NotFound();
            }

            var book = await _booksContext.Books.FindAsync(id);
            if(book == null)
            {
                return NotFound();
            }
            return book;
        }


        [HttpPost]
        public async Task<ActionResult<Books>> PostBooks(Books book)
        {
            _booksContext.Books.Add(book);
            await _booksContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBook), new {id = book.bookID}, book);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutBook(int id, Books book)
        {
            if(id != book.bookID)
            {
                return BadRequest();
            }
            _booksContext.Entry(book).State= EntityState.Modified;
            try
            {
                await _booksContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            if(_booksContext.Books == null)
            {
                return NotFound();
            }
            var book = await _booksContext.Books.FindAsync(id);
            if(book == null) 
            { 
                return NotFound();
            }

            _booksContext.Books.Remove(book);
            await _booksContext.SaveChangesAsync();
            return Ok();
        }

    }
}
