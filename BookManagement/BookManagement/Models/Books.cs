using System.ComponentModel.DataAnnotations;

namespace BookManagement.Models
{
    public class Books
    {
        [Key]
        public int bookID { get; set; }

        public string? bookTitle { get; set; }

        public string? bookAuthor { get; set; }

        public string? sharedWith { get; set;}

        public bool? isAvailable { get; set; }

        public bool? isShared { get; set;}

    }
}
