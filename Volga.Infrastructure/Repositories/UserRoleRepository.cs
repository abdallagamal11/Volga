﻿using Volga.Infrastructure.Models;
namespace Volga.Infrastructure.Repositories;

public class UserRoleRepository:BaseRepository<UserRole>
{
	public UserRoleRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}