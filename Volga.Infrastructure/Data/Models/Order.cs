﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Volga.Infrastructure.Data.Models;

public class Order
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required, ForeignKey("User")]
    public int UserId { get; set; }

    [Timestamp]
    public required byte[] Timestamp { get; set; }

    public virtual VgUser User { get; set; }
    public virtual IEnumerable<OrderLine> OrderLines { get; set; } = Enumerable.Empty<OrderLine>();
}