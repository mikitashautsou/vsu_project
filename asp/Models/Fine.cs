using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace Fines.Models
{
	public class Fine
	{
		[BsonRepresentation(BsonType.ObjectId)]
		public string UserId { get; set; }
		[Display(Name = "Description")]
		public string Description { get; set; }
		[Display(Name = "Fine Amount")]
		public int FineAmount { get; set; }
		[Display(Name = "Status")]
		public Status Status { get; set; }
	}

	public enum Status
	{
		Paid,
		NotPaid
	}
}
