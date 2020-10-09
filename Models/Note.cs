namespace LoveNotes.Models
{
    public class Note
    {
        public int Id { get; set; }
        //public int Speech {get;set;}
        //public DateTime TimeGenerated {get;set;}
        public string Author { get; set; }
        public string Body { get; set; }
        public bool Opened { get; set; }
    }
}