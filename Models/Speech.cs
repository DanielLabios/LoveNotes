using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;

namespace LoveNotes.Models
{
    public class Speech
    {
        public int Id { get; set; }


        [Required]
        public string Title { get; set; }

        public string SpeechKey { get; set; }
        [Required]
        public DateTime TimeSlot { get; set; }
        public DateTime OpenFeedbackPeriodUTC()
        {
            var openTime = TimeSlot.ToUniversalTime().AddHours(-1);
            return openTime;
        }
        public DateTime ClosedFeedbackPeriodUTC()
        {
            var closeTime = TimeSlot.ToUniversalTime().AddHours(2);
            return closeTime;
        }
        public int UserId { get; set; }
        public List<Note> Notes { get; set; }

        public int UnreadNoteCount
        {
            get
            {
                return Notes.Count(note => note.Opened == false);
            }
        }



        public User User { get; set; }

    }
}
