using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoveNotes.Models;

namespace LoveNotes.Controllers
{
    // All of these routes will be at the base URL:     /api/Notes
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case NotesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public NotesController(DatabaseContext context)
        {
            _context = context;
        }

        public class ProtoNote
        {
            public string Author { get; set; }
            public string Body { get; set; }
            public int SpeechId { get; set; }
        }


        // GET: api/Notes
        //
        // Returns a list of all your Notes
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            // Uses the database context in `_context` to request all of the Notes, sort
            // them by row id and return them as a JSON array.
            return await _context.Notes.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/Notes/5
        //
        // Fetches and returns a specific note by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            // Find the note in the database using `FindAsync` to look it up by id
            var note = await _context.Notes.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (note == null)
            {
                // Return a `404` response to the client indicating we could not find a note with this id
                return NotFound();
            }

            //  Return the note as a JSON object.
            return note;
        }

        [HttpPost("{id}/reading")]
        public async Task<ActionResult> MarkNoteRead(int id)
        {
            // Find the note in the database using `FindAsync` to look it up by id
            var note = await _context.Notes.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (note == null)
            {
                // Return a `404` response to the client indicating we could not find a note with this id
                return NotFound();
            }

            note.Opened = true;

            // If we had a "readings" table we could record that the current user read this note

            // Tell the database to consider everything in note to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from note
            _context.Entry(note).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!NoteExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            return Ok(note);
        }

        // PUT: api/Notes/5
        //
        // Update an individual note with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Note
        // variable named note. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Note POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, Note note)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != note.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in note to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from note
            _context.Entry(note).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!NoteExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            // return Ok(note)
            //
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Note>> GiveNote(ProtoNote protoNote)
        {
            if (protoNote.Body != "")
            {
                Note newNote = new Note
                {
                    Author = protoNote.Author == "" ? "Anonymous" : protoNote.Author,
                    Body = protoNote.Body,
                    Opened = false,
                    SpeechId = protoNote.SpeechId,
                };

                {
                    // Indicate to the database context we want to add this new record
                    _context.Notes.Add(newNote);
                    await _context.SaveChangesAsync();

                    // Return a response that indicates the object was created (status code `201`) and some additional
                    // headers with details of the newly created object.
                    return CreatedAtAction("GetNote", new { id = newNote.Id }, newNote);
                }
            }
            else
            {
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "The Note must have a body" }
                };
                return BadRequest(response);
            }
        }

        // DELETE: api/Notes/5
        //
        // Deletes an individual note with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            // Find this note by looking for the specific id
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                // There wasn't a note with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Notes.Remove(note);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(note)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing note by the supplied id
        private bool NoteExists(int id)
        {
            return _context.Notes.Any(note => note.Id == id);
        }
    }
}
