using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Fines.Models
{
	public class User
	{
		[BsonId]
		public string Id { get; set; }

		[BsonElement("username")]
		public string UserName { get; set; }

		[BsonElement("firstName")]
		public string FirstName { get; set; }

		[BsonElement("lastName")]
		public string LastName { get; set; }

		[BsonElement("role")]
		public Role Role { get; set; }
	}

	public enum Role
	{
		Regular,
		Policeman,
		Manager,
		Accountant,
		Admin
	}
}
