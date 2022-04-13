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
		[BsonElement("login")]
		public string Login { get; set; }

		[BsonElement("password")]
		public string Password { get; set; }

		public User()
		{

		}

		public User(User user)
		{
			Login = user.Login;
			Password = user.Password;
		}

		public User(string login, string password)
		{
			Login = login;
			Password = password;
		}
	}
}
