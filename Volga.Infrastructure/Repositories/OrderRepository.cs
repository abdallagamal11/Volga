﻿using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class OrderRepository:BaseRepository<Order>
{
	public OrderRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}