namespace webapi;

using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
// DataSeeder class
public static class DataSeeder
{
	public static void SeedData(DbContext context, int numberOfRecords)
	{
		var entityTypes = context.Model.GetEntityTypes()
			.Where(t => !IsIdentityTable(t))
			.Select(t => t.ClrType)
			.ToList();

		foreach (var entityType in entityTypes)
		{
			SeedEntity(context, entityType, numberOfRecords);
		}

		context.SaveChanges();
	}

	private static bool IsIdentityTable(IEntityType entityType)
	{
		return entityType.GetProperties().Any(p => p.ValueGenerated == ValueGenerated.OnAdd);
	}

	private static void SeedEntity(DbContext context, Type entityType, int numberOfRecords)
	{
		var faker = new Faker();
		var entities = SeedEntity(context, entityType, numberOfRecords, faker);

		context.AddRange(entities);
		context.SaveChanges();
	}

	private static List<object> SeedEntity(DbContext context, Type entityType, int numberOfRecords, Faker faker)
	{
		var entities = new List<object>();

		for (var i = 0; i < numberOfRecords; i++)
		{
			var entity = GenerateFakeEntity(context, entityType, faker);
			entities.Add(entity);
		}

		return entities;
	}

	private static object GenerateFakeEntity(DbContext context, Type entityType, Faker faker)
	{
		var entity = Activator.CreateInstance(entityType);

		foreach (var property in entityType.GetProperties())
		{
			// Skip navigation properties
			if (property.PropertyType.IsClass && property.PropertyType != typeof(string))
				continue;

			// Generate fake data based on property type
			var fakeData = GenerateFakeData(property.PropertyType, faker);
			property.SetValue(entity, fakeData);

			// Handle foreign keys using ForeignKey attribute
			var foreignKeyAttribute = property.GetCustomAttribute<ForeignKeyAttribute>();
			if (foreignKeyAttribute != null)
			{
				var referencedEntityType = context.Model.FindEntityType(foreignKeyAttribute.Name).ClrType;
				var referencedEntity = SeedEntity(context, referencedEntityType, 1, faker).FirstOrDefault();
				property.SetValue(entity, referencedEntity);
			}
		}

		return entity;
	}

	private static object GenerateFakeData(Type type, Faker faker)
	{
		// Add more cases for other types as needed
		if (type == typeof(int))
		{
			return faker.Random.Int();
		}
		else if (type == typeof(string))
		{
			return faker.Lorem.Word();
		}
		else if (type == typeof(decimal))
		{
			return faker.Random.Decimal(1, 100);
		}
		// Add more cases for other types as needed

		// For unsupported types, return null (customize as needed)
		return null;
	}
}