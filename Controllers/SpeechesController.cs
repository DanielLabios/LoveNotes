using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoveNotes.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace LoveNotes.Controllers
{
    // All of these routes will be at the base URL:     /api/Speeches
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case SpeechesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class SpeechesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public SpeechesController(DatabaseContext context)
        {
            _context = context;
        }

        public class GiveNoteDetails
        {
            public string Title { get; set; }
            public int SpeechId { get; set; }
            public string SpeechPerformerName { get; set; }
        }

        // GET: api/Speeches
        //
        // Returns a list of all your Speeches
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Speech>>> GetSpeeches(int? userId)
        {
            // Uses the database context in `_context` to request all of the Speeches, sort
            // them by row id and return them as a JSON array.
            if (userId == null)
            {

                return await _context.Speeches.OrderBy(row => row.Id).Include(speech => speech.Notes).ToListAsync();
            }
            else
            {
                return await _context.Speeches.Where(speech => speech.UserId == userId).OrderBy(speech => speech.TimeSlot).Include(speech => speech.Notes).ToListAsync();
            }


        }

        [HttpGet("upcoming")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Speech>> GetUpcomingSpeech()
        {
            var speech = await _context.Speeches.OrderBy(speech => speech.TimeSlot).Where(speech => speech.UserId == GetCurrentUserId()).Where(speech => speech.TimeSlot > DateTime.Now).Include(speech => speech.Notes).FirstOrDefaultAsync();
            if (speech == null)
            {
                // There wasn't a speech with that id so return a `404` not found
                return NotFound();
            }
            else
                return speech;

        }


        // GET: api/Speeches/5
        //
        // Fetches and returns a specific speech by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{speechKey}")]
        public async Task<ActionResult<GiveNoteDetails>> GetSpeech(string speechKey)
        {
            var foundSpeech = await _context.Speeches
                .Where(Speech => Speech.SpeechKey == speechKey)
                    .Include(speech => speech.User).FirstOrDefaultAsync();
            DateTime currentTime = DateTime.Now;
            int startFeedbackPeriod = DateTime.Compare(currentTime, foundSpeech.OpenFeedbackPeriod());
            int endFeedbackPeriod = DateTime.Compare(currentTime, foundSpeech.ClosedFeedbackPeriod());
            if (startFeedbackPeriod < 0 || endFeedbackPeriod >= 0)
            {
                var response = new
                {
                    status = 400,
                }; return BadRequest(response);
            }
            else
            {
                var pageDetails = new GiveNoteDetails
                {
                    Title = foundSpeech.Title,
                    SpeechId = foundSpeech.Id,
                    SpeechPerformerName = foundSpeech.User.Name
                };

                return pageDetails;
            }
        }

        [HttpGet("TimeValid{speechKey}")]
        public async Task<ActionResult> GetUserAndSpeech(string speechKey)
        {
            Speech foundSpeech = await _context.Speeches.FirstOrDefaultAsync(Speech => Speech.SpeechKey == speechKey);

            DateTime currentTime = DateTime.Now;
            // int startFeedbackPeriod = DateTime.Compare(currentTime, foundSpeech.OpenFeedbackPeriod());
            // int endFeedbackPeriod = DateTime.Compare(currentTime, foundSpeech.ClosedFeedbackPeriod());
            if (foundSpeech == null)
            {
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "Speech Key was entered incorrectly or was not found" }
                };
                return BadRequest(response);
            }

            if (currentTime < foundSpeech.OpenFeedbackPeriod())
            {
                var response = new
                {
                    status = 400,

                    errors = new List<string>() { "The Event has not started, try again later" }
                };

                return BadRequest(response);
            }
            if (currentTime >= foundSpeech.ClosedFeedbackPeriod())
            {
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "The Event is over. Feedback Period for speech is closed" }
                }; return BadRequest(response);
            }
            else
            {
                var response = 200;
                return Ok(response);

            }
        }

        // PUT: api/Speeches/5
        //
        // Update an individual speech with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Speech
        // variable named speech. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Speech POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpeech(int id, Speech speech)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != speech.Id)
            {
                return BadRequest();
            }




            // Tell the database to consider everything in speech to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from speech
            _context.Entry(speech).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!SpeechExists(id))
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
            // return Ok(speech)
            //
            return NoContent();
        }

        // POST: api/Speeches
        //
        // Creates a new speech in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Speech
        // variable named speech. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Speech POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Speech>> PostSpeech(Speech speech)
        {
            // Indicate to the database context we want to add this new record
            _context.Speeches.Add(speech);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetSpeech", new { id = speech.Id }, speech);
        }

        // DELETE: api/Speeches/5
        //
        // Deletes an individual speech with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpeech(int id)
        {
            // Find this speech by looking for the specific id
            var speech = await _context.Speeches.FindAsync(id);
            if (speech == null)
            {
                // There wasn't a speech with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Speeches.Remove(speech);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(speech)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing speech by the supplied id
        private bool SpeechExists(int id)
        {
            return _context.Speeches.Any(speech => speech.Id == id);
        }

        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}
