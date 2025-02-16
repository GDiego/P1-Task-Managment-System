using System.ComponentModel.DataAnnotations;

namespace TaskManagmentSystem.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public DateTime DueDate { get; set; }
        
        public bool IsCompleted { get; set; }
    }
}
