using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace Fines.Models
{
	public class Fine
	{
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		[Display(Name = "Description")]
		public string Description { get; set; }
		[Display(Name = "Fine Amount")]
		public double FineAmount { get; set; }
		[Display(Name = "Status")]
		public Status Status { get; set; }

		public Fine()
		{

		}

		public Fine(Fine fine)
		{
			Id = fine.Id;
			Description = fine.Description;
			FineAmount = fine.FineAmount;
			Status = fine.Status;
		}

		public Fine(string id, string description,
			int fineAmount, bool status)
		{
			Id = id.ToString();
			Description = description;
			FineAmount = fineAmount;
			Status = status ? Status.Paid : Status.NotPaid;
		}
	}

	public enum Status
	{
		Paid,
		NotPaid
	}
}
