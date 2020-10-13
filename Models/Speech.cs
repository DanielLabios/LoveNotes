using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LoveNotes.Models
{
    public class Speech
    {
        public int Id { get; set; }

        public int RegisteredSpeaker { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string SpeechKey { get; set; }
        [Required]
        public DateTime TimeSlot { get; set; }
        public TimeSpan OpenFeedbackPeriod { get; set; }
        public List<Note> Notes { get; set; }

    }
}
